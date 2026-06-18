# Logistics Smart Glass Design Guide

This file is the fallback Markdown guide for the design system page. In the browser, the "Design.md download" button generates a fresh file from the visible token tables at download time.

## Core Principles

- Prioritize the lower-center HUD area for primary work guidance.
- Use the center area only for scan success, scan failure, danger warnings, task completion, or required user confirmation.
- Keep top and side areas for secondary information and actions.
- Keep content short: one primary line, one secondary line, and no more than three lines total.
- Break work guidance into small steps because smart glass screens are narrow.
- Provide immediate visual and voice feedback for success and failure states.
- Treat customer-specific fields, terminology, colors, and task order as configurable.

## Visual Style Direction

Design the interface as a simple, clear, Toss-like SaaS and fintech work UI, not as a dense legacy admin dashboard.

The screen must help the user understand three things at first glance:

1. Current state
2. What needs attention
3. Next action

Use a bright, calm, trustworthy visual tone for web and documentation surfaces. For smart-glass HUD screens, keep the required camera, dark, and camera-off background rules, but apply the same simplicity: clear hierarchy, short text, generous spacing, and obvious feedback.

## 60-30-10 Color Rule

Use color with restraint. Do not fill the whole screen with the primary color unless the screen is intentionally a branded section or state surface.

- 60%: Background and base surfaces such as white, gray-50, gray-100, or very light neutral colors.
- 30%: Cards, grouped sections, secondary backgrounds, subtle gray or subtle blue-tinted surfaces.
- 10%: Primary or accent color for the main action, selected state, key metric, scan feedback, or important status.

Primary color must guide attention. It should appear on the strongest action or the most important state, not on every decorative element.

## Color Token Naming Rules

Use semantic color roles, not numeric color scales. Do not use names like `success-5`, `blue-60`, or `gray-100` as the main token exposed to AI.

- Use the `Type` column to show where the color is applied: `background`, `line`, `text`, or `opacity`.
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
| background | Barcode scan toast | #003CFF | `color/background/scan-toast` |
| background | Primary action, voice-command selection, active state | #0073FF | `color/background/primary` |
| background | Sub-primary surface and supporting icon color on primary surfaces | #90C2FF | `color/background/primary-subtle` |
| background | Secondary gray surface | #EFF2F8 | `color/background/subtle` |
| background | Disabled gray surface | #CCCCCC | `color/background/disabled` |
| background | Information surface and secondary button | #FFFFFF | `color/background/white` |
| background | Camera-off selection UI and status screens | #000000 | `color/background/dark` |
| background | Secondary surface inside dark screens | #444444 | `color/background/dark-subtle` |
| background | Secondary information over camera view | rgba(0,0,0,0.8) | `color/background/camera-overlay` |
| background | Selected option when multiple choices are shown | #C8FFC3 | `color/background/selected` |
| background | Success or completed state surface | #12B52A | `color/background/success` |
| background | Warning or needs-confirmation state surface | #F59E0B | `color/background/warning` |
| background | Error or stop state surface | #F04438 | `color/background/error` |
| background | Issue or needs-confirmation card | #D8B4B7 | `color/background/issue` |
| line | Divider and disabled state | #CCCCCC | `color/line/divider` |
| line | Light divider on dark screens | #FFFFFF | `color/line/light` |
| line | Strong divider on light screens | #000000 | `color/line/strong` |
| line | Dark surfaces | #444444 | `color/line/dark` |
| line | Selected option and voice command button | #12B52A | `color/line/selected` |
| line | Warning or needs-confirmation outline | #F59E0B | `color/line/warning` |
| line | Error or stop outline | #F04438 | `color/line/error` |
| line | Issue or needs-confirmation outline | #D8B4B7 | `color/line/issue` |
| text | Primary information on light screens | #000000 | `color/text/primary` |
| text | Supporting icon or secondary information on white or primary surfaces | #90C2FF | `color/text/primary-subtle` |
| text | Disabled state and secondary information | #999999 | `color/text/muted` |
| text | Information on dark screens | #FFFFFF | `color/text/on-dark` |
| text | Success or completed message | #12B52A | `color/text/success` |
| text | Warning or needs-confirmation message | #F59E0B | `color/text/warning` |
| text | Error or stop message | #F04438 | `color/text/error` |
| text | Issue or needs-confirmation message | #D8B4B7 | `color/text/issue` |
| opacity | Completed or issue list rows | 80% | `color/opacity/completed` |
| opacity | Unselected choices while another choice is selected | 40% | `color/opacity/unselected` |

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
