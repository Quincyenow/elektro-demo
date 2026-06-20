# Skills

This directory vendors the **Superpowers** skill library so it persists across
Claude Code web sessions for this project.

- Source: https://github.com/obra/superpowers
- Version: 6.0.3
- License: MIT (Jesse Vincent)

A `SessionStart` hook (`.claude/hooks/superpowers-session-start.sh`, wired up in
`.claude/settings.json`) injects the `using-superpowers` skill at the start of
each session so the rest of the skills are discovered and used automatically.

To update, re-copy the `skills/` directory from the upstream repository.
