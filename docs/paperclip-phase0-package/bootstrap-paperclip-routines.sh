#!/usr/bin/env bash
set -euo pipefail

# Routines bootstrap script for Forever Lotus x Awaricon Phase 0.
# Creates routines and schedule triggers using Paperclip API endpoints:
# - POST /api/companies/{companyId}/routines
# - POST /api/routines/{routineId}/triggers

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

api_post() {
  local path="$1"
  local payload="$2"
  curl -sS -X POST "$PAPERCLIP_API_URL/api/$path" \
    -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$payload"
}

extract_id() {
  jq -r '.id // empty' 2>/dev/null || true
}

echo "Creating routines and schedule triggers..."

while IFS= read -r routine; do
  title="$(echo "$routine" | jq -r '.title')"
  purpose="$(echo "$routine" | jq -r '.purpose // ""')"
  cron="$(echo "$routine" | jq -r '.cron // ""')"
  timezone="$(echo "$routine" | jq -r '.timezone // "UTC"')"

  if [[ -z "$title" || -z "$cron" ]]; then
    echo "Skipping invalid routine entry: missing title or cron"
    continue
  fi

  routine_payload="$(jq -nc \
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
    routine_payload="$(echo "$routine_payload" | jq --arg goalId "$PAPERCLIP_ROUTINE_GOAL_ID" '. + {goalId: $goalId}')"
  fi

  if [[ -n "${PAPERCLIP_ROUTINE_PARENT_ISSUE_ID:-}" ]]; then
    routine_payload="$(echo "$routine_payload" | jq --arg parentIssueId "$PAPERCLIP_ROUTINE_PARENT_ISSUE_ID" '. + {parentIssueId: $parentIssueId}')"
  fi

  echo "Creating routine: $title"
  create_response="$(api_post "companies/$PAPERCLIP_COMPANY_ID/routines" "$routine_payload")"
  routine_id="$(echo "$create_response" | extract_id)"

  if [[ -z "$routine_id" ]]; then
    echo "Failed to create routine: $title"
    echo "$create_response"
    exit 1
  fi

  trigger_payload="$(jq -nc \
    --arg kind "schedule" \
    --arg cronExpression "$cron" \
    --arg timezone "$timezone" \
    --arg label "Auto: $title" \
    '{kind: $kind, cronExpression: $cronExpression, timezone: $timezone, label: $label}')"

  echo "Adding schedule trigger for routine: $title"
  trigger_response="$(api_post "routines/$routine_id/triggers" "$trigger_payload")"

  trigger_id="$(echo "$trigger_response" | extract_id)"
  if [[ -z "$trigger_id" ]]; then
    echo "Failed to add trigger for routine: $title"
    echo "$trigger_response"
    exit 1
  fi

done < <(jq -c '.routines[]' "$ROUTINES_JSON")

echo "Routines bootstrap complete."
