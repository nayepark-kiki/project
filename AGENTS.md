# Agent Notes

## Project

- Work in `/Users/eunjeelee/Downloads/claude-figma`.
- Main page: `index.html`.
- Main styles: `smart-glass-design-system.css`.
- Main scripts: `smart-glass-design-system.js`.
- AI guide output/source: `design.md`.

## Required Plugin

- Keep using the local `Caveman` plugin for this project when available.
- Plugin path: `.codex-plugins/caveman`.
- Skill: `Caveman:caveman`.
- Default communication mode: terse, low-filler, technically exact.
- Use Caveman style for status updates, summaries, and implementation notes unless the user asks for normal mode or extra explanation.
- Do not let Caveman terseness remove important warnings, exact file paths, verification results, or user-facing Korean clarity.

## Work Rules

- Existing uncommitted changes may be user work. Do not revert them unless explicitly requested.
- Use `apply_patch` for manual file edits.
- Keep `design.md` AI-facing and mostly English.
- Keep `index.html` human-facing and Korean-first.
- For simple UI edits, use minimum-token mode: inspect and edit only directly related code.
- For simple UI edits, do not do full project analysis, unrelated file exploration, refactors, new libraries, or new test files.
- Preserve existing features and data; change only the requested text, column, or position.
- Summaries for simple UI edits should be short: changed files and result only.
- For routine verification, run:
  - `node --check smart-glass-design-system.js`
  - `git diff --check`
