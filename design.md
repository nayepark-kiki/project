# Logistics Smart Glass Design Guide

This file is the fallback Markdown guide for the design system page. In the browser, the "Design.md download" button generates a fresh file from the visible token tables at download time.

## Core Principles

- Prioritize the lower-center HUD area for primary work guidance.
- Use the center area only for scan success, scan failure, danger warnings, task completion, or required user confirmation.
- Keep top and side areas for secondary information and actions.
- Keep content short: one primary line, one secondary line, and no more than three lines total.
- Use camera HUD screens for work guidance and scanning. Use camera-off screens for lists, category selection, issue reporting, and completion states.
- Treat customer-specific fields, terminology, colors, and task order as configurable.

## Token Source

### Color Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `color/background/scan-toast` | #003CFF | Barcode scan toast background |
| `color/background/primary` | #0073FF | Primary action, voice-command selection, active state |
| `color/background/primary-subtle` | #90C2FF | Sub-primary background and supporting icon color on primary surfaces |
| `color/background/subtle` | #EFF2F8 | Secondary gray surface background |
| `color/background/disabled` | #CCCCCC | Disabled gray background |
| `color/background/white` | #FFFFFF | Information surface and secondary button background |
| `color/background/dark` | #000000 | Camera-off background for selection UI and status screens |
| `color/background/dark-subtle` | #444444 | Secondary surface inside dark backgrounds |
| `color/background/camera-overlay` | rgba(0,0,0,0.8) | Overlay background for secondary information over camera view |
| `color/background/selected` | #C8FFC3 | Selected option background when multiple choices are shown |
| `color/background/completed-opacity` | 80% | Opacity for completed or issue list rows |
| `color/background/unselected-opacity` | 40% | Opacity for unselected choices while another choice is selected |
| `color/line/divider` | #CCCCCC | Divider and disabled border |
| `color/line/dark` | #444444 | Border on dark backgrounds |
| `color/line/selected` | #12B52A | Selected option border and voice command button border |
| `color/text/primary-subtle` | #90C2FF | Supporting icon or secondary text on white or primary backgrounds |
| `color/text/muted` | #999999 | Disabled text and secondary information |
| `color/text/on-dark` | #FFFFFF | Text on dark backgrounds |

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
