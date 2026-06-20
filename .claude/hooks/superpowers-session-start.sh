#!/usr/bin/env bash
# SessionStart hook: bootstraps the Superpowers skill library by injecting the
# 'using-superpowers' skill so Claude knows how to find and use the other skills.
# Adapted from obra/superpowers for a project-level (non-plugin) install.

set -euo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
SKILL_FILE="${ROOT}/.claude/skills/using-superpowers/SKILL.md"

content=$(cat "${SKILL_FILE}" 2>/dev/null || echo "Error reading using-superpowers skill")

# Escape a string for safe embedding in JSON.
escape_for_json() {
    local s="$1"
    s="${s//\\/\\\\}"
    s="${s//\"/\\\"}"
    s="${s//$'\n'/\\n}"
    s="${s//$'\r'/\\r}"
    s="${s//$'\t'/\\t}"
    printf '%s' "$s"
}

escaped=$(escape_for_json "$content")
context="<EXTREMELY_IMPORTANT>\nYou have superpowers.\n\n**Below is the full content of your 'using-superpowers' skill - your introduction to using skills. For all other skills, use the 'Skill' tool:**\n\n${escaped}\n</EXTREMELY_IMPORTANT>"

printf '{\n  "hookSpecificOutput": {\n    "hookEventName": "SessionStart",\n    "additionalContext": "%s"\n  }\n}\n' "$context"
