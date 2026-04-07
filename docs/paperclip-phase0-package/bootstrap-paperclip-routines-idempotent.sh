#!/usr/bin/env bash
set -euo pipefail

# Idempotent routines bootstrap for Forever Lotus x Awaricon Phase 0.
# Behavior:
# - Finds routine by title in company list
# - Creates routine if missing
# - Patches routine if existing
# - Adds schedule trigger only if the same cron+timezone trigger is missing

required_env=(
  PAPERCLIP_API_URL
  PAPERCLIP_API_KEY
  PAPERCLIP_COMPANY_ID
  PAPERCLIP_ROUTINE_ASSIGNEE_AGENT_ID
  PAPERCLIP_ROUTINE_PROJECT_ID
)

for name in "${required_env[@]}"; do
  if [[ -z "${!name:-}" ]]; then
    echo "Missing required env var: $name"
    exit 1
  fi
done

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROUTINES_JSON="$ROOT_DIR/routines.json"

if [[ ! -f "$ROUTINES_JSON" ]]; then
  echo "Expected routines.json in $ROOT_DIR"
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required but not installed"
  exit 1
fi

api_get() {
  local path="$1"
  curl -sS "$PAPERCLIP_API_URL/api/$path" \
    -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
    -H "Content-Type: application/json"
}

api_post() {
  local path="$1"
  local payload="$2"
  curl -sS -X POST "$PAPERCLIP_API_URL/api/$path" \
    -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$payload"
}

api_patch() {
  local path="$1"
  local payload="$2"
  curl -sS -X PATCH "$PAPERCLIP_API_URL/api/$path" \
    -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$payload"
}

extract_id() {
  jq -r '.id // empty' 2>/dev/null || true
}

list_routines_json="$(api_get "companies/$PAPERCLIP_COMPANY_ID/routines")"

if [[ -z "$list_routines_json" ]]; then
  echo "Failed to list existing routines"
  exit 1
fi

echo "Idempotent routine sync started..."

while IFS= read -r routine; do
  title="$(echo "$routine" | jq -r '.title')"
  purpose="$(echo "$routine" | jq -r '.purpose // ""')"
  cron="$(echo "$routine" | jq -r '.cron // ""')"
  timezone="$(echo "$routine" | jq -r '.timezone // "UTC"')"

  if [[ -z "$title" || -z "$cron" ]]; then
    echo "Skipping invalid routine entry: missing title or cron"
    continue
  fi

  existing_id="$(echo "$list_routines_json" | jq -r --arg title "$title" '.[] | select(.title == $title) | .id' | head -n1)"

  base_payload="$(jq -nc \
    --arg title "$title" \
    --arg description "$purpose" \
    --arg assigneeAgentId "$PAPERCLIP_ROUTINE_ASSIGNEE_AGENT_ID" \
    --arg projectId "$PAPERCLIP_ROUTINE_PROJECT_ID" \
    --arg priority "medium" \
    --arg status "active" \
    --arg concurrencyPolicy "coalesce_if_active" \
    --arg catchUpPolicy "skip_missed" \
    '{
      title: $title,
      description: $description,
      assigneeAgentId: $assigneeAgentId,
      projectId: $projectId,
      priority: $priority,
      status: $status,
      concurrencyPolicy: $concurrencyPolicy,
      catchUpPolicy: $catchUpPolicy
    }')"

  if [[ -n "${PAPERCLIP_ROUTINE_GOAL_ID:-}" ]]; then
    base_payload="$(echo "$base_payload" | jq --arg goalId "$PAPERCLIP_ROUTINE_GOAL_ID" '. + {goalId: $goalId}')"
  fi

  if [[ -n "${PAPERCLIP_ROUTINE_PARENT_ISSUE_ID:-}" ]]; then
    base_payload="$(echo "$base_payload" | jq --arg parentIssueId "$PAPERCLIP_ROUTINE_PARENT_ISSUE_ID" '. + {parentIssueId: $parentIssueId}')"
  fi

  if [[ -z "$existing_id" ]]; then
    echo "Creating routine: $title"
    create_response="$(api_post "companies/$PAPERCLIP_COMPANY_ID/routines" "$base_payload")"
    routine_id="$(echo "$create_response" | extract_id)"
    if [[ -z "$routine_id" ]]; then
      echo "Failed to create routine: $title"
      echo "$create_response"
      exit 1
    fi
    list_routines_json="$(echo "$list_routines_json" | jq --argjson item "$create_response" '. + [$item]')"
  else
    echo "Updating existing routine: $title"
    patch_response="$(api_patch "routines/$existing_id" "$base_payload")"
    routine_id="$(echo "$patch_response" | extract_id)"
    if [[ -z "$routine_id" ]]; then
      echo "Failed to update routine: $title"
      echo "$patch_response"
      exit 1
    fi
  fi

  detail_response="$(api_get "routines/$routine_id")"

  trigger_exists="$(echo "$detail_response" | jq -r \
    --arg cron "$cron" \
    --arg tz "$timezone" \
    '[.triggers[]? | select(.kind == "schedule" and .cronExpression == $cron and .timezone == $tz)] | length')"

  if [[ "$trigger_exists" != "0" ]]; then
    echo "Schedule trigger already exists for: $title"
    continue
  fi

  trigger_payload="$(jq -nc \
    --arg kind "schedule" \
    --arg cronExpression "$cron" \
    --arg timezone "$timezone" \
    --arg label "Auto: $title" \
    '{kind: $kind, cronExpression: $cronExpression, timezone: $timezone, label: $label}')"

  echo "Adding schedule trigger for: $title"
  trigger_response="$(api_post "routines/$routine_id/triggers" "$trigger_payload")"
  trigger_id="$(echo "$trigger_response" | extract_id)"
  if [[ -z "$trigger_id" ]]; then
    echo "Failed to add trigger for: $title"
    echo "$trigger_response"
    exit 1
  fi
done < <(jq -c '.routines[]' "$ROUTINES_JSON")

echo "Idempotent routine sync complete."
