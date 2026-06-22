# Logistics Smart Glass Design Guide

This file is the fallback Markdown guide for the design system page. In the browser, the "Design.md download" button generates a fresh file from the visible token tables at download time.

## Core Principles

- Prioritize the lower-center HUD area for primary work guidance.
- Use the center area only for scan success, scan failure, danger warnings, task completion, or required user confirmation.
- Keep top and side areas for secondary information and actions.
- For always-visible work information, prefer one primary line plus one secondary line. Use three lines only when necessary.
- Do not overload the HUD with information or UI controls. Show only the minimum information needed for the task.
- Break work guidance into small steps because smart glass screens are narrow.
- Provide immediate visual and voice feedback for success and failure states.
- Treat displayed information such as BIN, SKU, model name, terminology, key colors, and task order as project-specific.

## Visual Style Direction

Design the interface as a simple, clear, Toss-like SaaS and fintech work UI, not as a dense legacy admin dashboard.

The screen must help the user understand three things at first glance:

1. Current state
2. What needs attention
3. Next action

Use a bright, calm, trustworthy visual tone for web and documentation surfaces. For smart-glass HUD screens, keep the required camera, dark, and camera-off background rules, but apply the same simplicity: clear hierarchy, short text, generous spacing, and obvious feedback.

## 60-30-10 Color Rule

Use the 60-30-10 rule as a reference for screen color proportion.

- 60%: Background and Surface colors.
- 30%: Secondary supporting areas.
- 10%: Primary or Accent colors for core actions and emphasis.

Primary color must guide attention. In smart-glass UI, apply Primary color mainly to CTAs, selected states, and key interaction elements rather than large brand-colored areas.

## Color Token Naming Rules

Use semantic color roles, not numeric color scales. Do not use names like `success-5`, `blue-60`, or `gray-100` as the main token exposed to AI.

- Use the `Type` column to show where the color is applied: `Surface`, `line`, or `text`.
- Use the `Usage` column to explain intent and context in plain language, such as primary action, selected state, dark screen, success feedback, warning, error, or issue state.
- When hierarchy is needed, keep it visible in the token name with obvious suffixes such as `sub`, `dark`, or `on-dark`.
- Keep detailed color scales internal. The public guide should explain how each token is used.

## Tone and Layout Rules

- Prefer a clean SaaS or fintech product feel over a rigid admin-page feel.
- Use generous spacing and clear information groups.
- Prefer cards, sections, steps, and short lists over dense tables.
- Make only one primary action visually dominant per screen.
- Use secondary buttons or text buttons for lower-priority actions.
- Keep text short, direct, and user-facing.
- Highlight numbers and status values so they are easy to scan.
- Use badges or tags for status values instead of plain text-only status lists.

## Component Style Rules

### Buttons

- Use the primary button only for the most important action.
- Use enough height, clear tap/click area, and rounded corners.
- Button labels must be short and action-oriented.
- Disabled buttons must be clearly gray and lower emphasis.

### Cards

- Use white or very light surfaces.
- Use rounded corners.
- Use subtle borders or very soft shadows, not heavy shadows.
- Keep internal padding generous.
- Place title, key information, supporting text, and actions in a clear hierarchy.

### Inputs

- Keep input fields simple and obvious.
- Placeholder text should look like a real input example.
- Show errors directly below the field in short language.
- Use the primary color for focus state.

### Status

- Use soft green for success.
- Use soft orange for warning.
- Use clear but not aggressive red for error.
- Always pair color with text so the meaning is not color-only.

## AI Layout Order

When generating a screen, compose it in this order:

1. Show the page or task purpose at the top.
2. Place the most important state or data first.
3. Group supporting information into cards, sections, or lists.
4. Place the primary action in the main decision area or bottom action area.
5. Remove unnecessary decoration, filler text, and excessive icons.

## Avoid

- Dense admin dashboards with small text and crowded tables.
- Heavy dark backgrounds on general web or documentation pages.
- Using primary color across too many elements.
- Multiple competing primary buttons.
- Decorative illustrations that do not explain the task.
- Long system-like labels when a user-facing phrase is clearer.
- Unclear status where the user cannot tell what happened or what to do next.

## Token Source

### Color Tokens

| Type | Usage | Value | Token |
| --- | --- | --- | --- |
| Surface | Work instruction, barcode scan | #003CFF | `color/background/primary-scan` |
| Surface | Important states, active state, voice button | #0073FF | `color/background/primary` |
| Surface | Supporting voice icon | #90C2FF | `color/background/primary-subtle` |
| Surface | Information surface, secondary button | #FFFFFF | `color/background/white` |
| Surface | Camera off | #000000 | `color/background/black` |
| Surface | Secondary information | #000000 80% | `color/background/gray-overlay` |
| Surface | Gray on dark backgrounds | #444444 | `color/background/gray-dark` |
| Surface | Disabled on dark backgrounds | #666666 | `color/background/gray-disabled-dark` |
| Surface | Disabled on bright backgrounds | #CCCCCC | `color/background/gray-disabled-bright` |
| Surface | Gray on bright backgrounds | #EFF2F8 | `color/background/gray-bright` |
| Surface | Completed, success | #12B52A | `color/background/status-success` |
| Surface | Multi-selected option when Primary color is already heavily used | #C8FFC3 | `color/background/status-success-selected` |
| Surface | Warning, confirmation needed | #F59E0B | `color/background/status-warning` |
| Surface | Error, stop | #F04438 | `color/background/status-error` |
| Surface | Issue, needs-confirmation card | #D8B4B7 | `color/background/status-issue` |
| line | Divider on bright backgrounds | #CCCCCC | `color/line/basic` |
| line | Divider on dark backgrounds | #444444 | `color/line/dark` |
| line | Divider on colored backgrounds | #000000 50% | `color/line/overlay-bright` |
| line | Success | #12B52A | `color/line/status-success` |
| line | Warning, confirmation needed | #F59E0B | `color/line/status-warning` |
| line | Error, stop | #F04438 | `color/line/status-error` |
| line | Issue, confirmation | #D8B4B7 | `color/line/status-issue` |
| text | Information on bright backgrounds | #000000 | `color/text/black` |
| text | Secondary information on white or primary surfaces | #90C2FF | `color/text/primary-subtle` |
| text | Disabled and secondary information | #999999 | `color/text/disabled` |
| text | Information on dark backgrounds | #FFFFFF | `color/text/white` |
| text | Success, completed | #12B52A | `color/text/status-success` |
| text | Warning, confirmation needed | #F59E0B | `color/text/status-warning` |
| text | Error, stop | #F04438 | `color/text/status-error` |

### Typography Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `font/family/base` | Pretendard | Base UI font |
| `font/data/lg` | 30px / 800 | Large primary data |
| `font/data/md` | 28px / 800 | Medium primary data |
| `font/data/sm` | 24px / 800 | Small primary data |
| `font/instruction/main` | 24px / 600 | Primary work instruction |
| `font/button/main` | 20px / 600 | Primary button text |
| `font/info/lg` | 24px / 600 | Large secondary information |
| `font/info/md` | 20px / 600 | Medium secondary information |
| `font/info/sm` | 18px / 600 | Small secondary information |
| `font/button/sub` | 18px / 600 | Secondary button text |
| `font/caption` | 16px / 600 | Caption and secondary status text |

### Safe Area and Spacing Tokens

Use a 4px spacing scale by default. Add 2px exceptions only when the HUD component needs tighter optical alignment.

| Token | Value | Usage |
| --- | --- | --- |
| `safe/top` | 80px | Top safe area for every screen |
| `safe/bottom` | 15px | Bottom safe area for every screen |
| `safe/side` | 20px | Left and right safe area for every screen |
| `radius/container` | 12px | Outer container radius |
| `radius/toast` | 999px | Toast and pill button radius |
| `space/padding/ui` | 8, 12, 16, 20px | Internal UI padding scale |
| `space/padding/icon-pill` | 12, 12, 20px / 8, 2, 12px | Asymmetric padding for icon pills where icon-side padding is smaller than text-side padding |

## Screen Generation Prompt Shape

```text
Work type:
Screen type:
Background type:
Display fields:
Field priority:
Primary input method:
Voice commands:
Completion/error state:
Customer brand color:
```
