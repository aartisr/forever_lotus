#!/usr/bin/env bash
set -euo pipefail

# Phase 0 bootstrap script for Forever Lotus x Awaricon
# This script creates goals/projects/issues via Paperclip API.
# It is intentionally explicit and safe: no destructive operations.

if [[ -z "${PAPERCLIP_API_URL:-}" || -z "${PAPERCLIP_API_KEY:-}" || -z "${PAPERCLIP_COMPANY_ID:-}" ]]; then
  echo "Missing one or more required env vars: PAPERCLIP_API_URL, PAPERCLIP_API_KEY, PAPERCLIP_COMPANY_ID"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GOALS_JSON="$ROOT_DIR/goals.json"
PROJECTS_JSON="$ROOT_DIR/projects.json"

if [[ ! -f "$GOALS_JSON" || ! -f "$PROJECTS_JSON" ]]; then
  echo "Expected goals.json and projects.json in $ROOT_DIR"
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

echo "[1/3] Creating goals..."
while IFS= read -r goal; do
  title="$(echo "$goal" | jq -r '.title')"
  description="$(echo "$goal" | jq -r '.description')"
  priority="$(echo "$goal" | jq -r '.priority')"

  payload="$(jq -nc \
    --arg title "$title" \
    --arg description "$description" \
    --arg priority "$priority" \
    '{title: $title, description: $description, priority: $priority}')"

  echo "Creating goal: $title"
  api_post "companies/$PAPERCLIP_COMPANY_ID/goals" "$payload" >/dev/null

done < <(jq -c '.goals[]' "$GOALS_JSON")

echo "[2/3] Creating projects..."
while IFS= read -r project; do
  title="$(echo "$project" | jq -r '.title')"
  description="$(echo "$project" | jq -r '.description')"

  payload="$(jq -nc \
    --arg title "$title" \
    --arg description "$description" \
    '{title: $title, description: $description}')"

  echo "Creating project: $title"
  api_post "companies/$PAPERCLIP_COMPANY_ID/projects" "$payload" >/dev/null

done < <(jq -c '.projects[]' "$PROJECTS_JSON")

echo "[3/3] Creating seed execution issues..."
seed_issues=(
  "Finalize KPI data dictionary and baseline owners"
  "Publish Manifesto Control Matrix and enforcement process"
  "Stand up weekly transparency digest process"
  "Profile first 20 Anchor 50 organizations"
  "Prepare Awaricon standards document outline"
)

for issue_title in "${seed_issues[@]}"; do
  payload="$(jq -nc --arg title "$issue_title" '{title: $title, priority: "high", status: "todo"}')"
  echo "Creating issue: $issue_title"
  api_post "companies/$PAPERCLIP_COMPANY_ID/issues" "$payload" >/dev/null
done

echo "Bootstrap complete."
