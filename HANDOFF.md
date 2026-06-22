# Codex Handoff

## Project

- Project path: `/Users/eunjeelee/Desktop/2026/project`
- Current working target: `index.dc.html`
- Browser preview URL: `file:///Users/eunjeelee/Desktop/2026/project/index.dc.html`
- Old/general preview URL: `file:///Users/eunjeelee/Desktop/2026/project/index.html`

## Main Files

- `index.dc.html`: Claude Design editable page. Use this for page structure, Korean text, sections, and token table content.
- `index-original-backup.html`: backup of the earlier Codex-made HTML.
- `index.html`: older/general page. Do not use as primary edit target unless user explicitly asks.
- `smart-glass-design-system.css`: shared visual styles.
- `smart-glass-design-system.js`: shared interactions, token copy/editing, `design.md` download generation, parallax/reveal.
- `design.md`: AI-facing smart-glass screen guide. Mostly English.
- `support.js`: generated Claude Design runtime. Do not edit manually.
- `assets/`: icons/images, including `tick-circle.svg` and `receive-square.svg`.

## Important Working Rule

For future edits, work on `index.dc.html` by default.

- Screen structure/text/sections: edit `index.dc.html`
- Shared styling: edit `smart-glass-design-system.css`
- Behavior/copy/download/animation: edit `smart-glass-design-system.js`
- AI guide sync: edit `design.md`

Keep user changes. Do not revert uncommitted work.

## User Preference

Use minimum-token mode for simple UI edits.

- Inspect only directly related code.
- No full project analysis.
- No unrelated refactor.
- No new libraries.
- No test files.
- Preserve existing features and data.
- Final response should be short: changed files + result.

The project also asks to keep using local Caveman style when available: terse, clear, Korean-friendly, no filler.

## Claude Design Structure

`index.dc.html` uses Claude Design format:

- Actual page markup lives inside `<x-dc>...</x-dc>`.
- Runtime is loaded by `<script src="./support.js"></script>`.
- `smart-glass-design-system.js` is injected after mount from:

```html
<script type="text/x-dc" data-dc-script>
class Component extends DCLogic {
  componentDidMount() {
    if (document.getElementById("sg-ds-script")) {
      return;
    }
    const script = document.createElement("script");
    script.id = "sg-ds-script";
    script.src = "smart-glass-design-system.js";
    document.body.appendChild(script);
  }
}
</script>
```

Do not remove this unless replacing the interaction loading path intentionally.

## Current Design Direction

- Internal practical design system page for logistics smart-glass screens.
- Human-facing web page: Korean-first.
- `design.md`: AI-facing, mostly English.
- UI mood: Toss-like simple SaaS/fintech clarity.
- Bright background, wide spacing, clear cards/sections.
- Avoid generic AI-admin dashboard look.
- Primary color should be limited to key actions/states.

## Smart Glass Screen Principles

- Main work info should prioritize bottom-center placement.
- Center area is only for scan success/failure, danger warning, completion, or confirmation-needed states.
- Top/left/right areas are secondary info.
- Safe margins: top `80px`, bottom `15px`, sides `20px+`.
- Persistent task info: recommended `1 core line + 1 supporting line`; use 3 lines only when needed.
- Do not overload the small smart-glass screen.
- Camera-less screens such as list, issue report, or selection should show black outside selection UI.

## Recent UI State

### Token Section

- Color token table should read visually as `유형 / 토큰 / 사용처 / 값`.
- Same `유형` values are grouped with merged-looking rows.
- Token names are clickable text, not real navigation links.
- Token/value copy success uses green tick-circle icon.
- `값` column copy buttons were removed; clicking value text copies value.
- Token/value text has underline and hover state.
- Type column has right-side divider on body cells, not header.
- Table header font size: `13px`.
- `토큰`, `값` body font size: `14px`.
- `사용처` body font size: `16px`.
- `유형` body font size: `16px`.
- `유형` column width reduced to about `100px`.
- Token subsection titles (`색상 토큰`, `타이포그래피 토큰`, `안전 여백과 간격`) are `20px`.
- Color token bottom note was deleted.
- Token subsections have extra vertical spacing.

### Color Ratio Card

Color token area includes a separate `색상 비율` box:

- Title: `색상 비율`
- No `(key colors proportion)` text.
- Background: `#eef1f5`
- Title: `20px`, `700`
- Description: `15px`, tighter line-height, manual line breaks for readability.
- Progress bar: height `52px`.
- 60/30/10 labels: `16px`, `700`, vertically centered.
- 60% area background: `#ffffff`.

### Animations

- Page has scroll reveal:
  - Initial: `opacity: 0`, `transform: translateY(24px) scale(0.96)`
  - Revealed: `opacity: 1`, `transform: translateY(0) scale(1)`
  - Lower threshold and short duration/delay so content appears quickly.
  - Disabled for `prefers-reduced-motion`.
- Basic parallax was attempted earlier; avoid causing section overlap.

### Icons

- Copy success icon: `assets/tick-circle.svg`
- Design.md download button icon: `assets/receive-square.svg`

## Current Color Token Data

Color tokens should follow this row order and grouping:

| Type | Token | Usage | Value |
| --- | --- | --- | --- |
| Surface | color/background/primary-scan | 행동 지시(바코드 스캔) | #003CFF |
| Surface | color/background/primary | 중요(활성 상태, 발화 버튼) | #0073FF |
| Surface | color/background/primary-subtle | 보조(발화 아이콘) | #90C2FF |
| Surface | color/background/white | 정보, 서브 버튼 | #FFFFFF |
| Surface | color/background/black | 카메라 OFF | #000000 |
| Surface | color/background/gray-overlay | 서브 정보 | #000000 80% |
| Surface | color/background/gray-dark | 어두운 배경 위 그레이 | #444444 |
| Surface | color/background/gray-disabled-dark | 어두운 배경 위 비활성화 | #666666 |
| Surface | color/background/gray-disabled-bright | 밝은 배경 위 비활성화 | #CCCCCC |
| Surface | color/background/gray-bright | 밝은 배경 위 그레이 | #EFF2F8 |
| Surface | color/background/status-success | 완료, 성공 | #12B52A |
| Surface | color/background/status-success-selected | 화면에 Primary 컬러가 많을 때, 다중 선택된 선택지 | #C8FFC3 |
| Surface | color/background/status-warning | 주의, 확인 필요 | #F59E0B |
| Surface | color/background/status-error | 오류, 중단 | #F04438 |
| Surface | color/background/status-issue | 이슈, 확인 필요 카드 | #D8B4B7 |
| line | color/line/basic | 밝은 배경 위 디바이더 | #CCCCCC |
| line | color/line/dark | 어두운 배경 위 디바이더 | #444444 |
| line | color/line/overlay-bright | 컬러 배경 위 디바이더 | #000000 50% |
| line | color/line/status-success | 성공 | #12B52A |
| line | color/line/status-warning | 주의, 확인 필요 | #F59E0B |
| line | color/line/status-error | 오류, 중단 | #F04438 |
| line | color/line/status-issue | 이슈, 확인 | #D8B4B7 |
| text | color/text/black | 밝은 배경 위 정보 | #000000 |
| text | color/text/primary-subtle | 흰색 또는 프라이머리 위 서브 정보 | #90C2FF |
| text | color/text/disabled | 비활성화, 서브 정보 | #999999 |
| text | color/text/white | 어두운 배경 위 정보 | #FFFFFF |
| text | color/text/status-success | 성공, 완료 | #12B52A |
| text | color/text/status-warning | 주의, 확인 필요 | #F59E0B |
| text | color/text/status-error | 오류, 중단 | #F04438 |

## Text Already Updated

Screen common principle `03 최대 3줄`:

```text
상시 노출되는 작업 정보는 1줄 핵심 + 1줄 보조를 권장하며, 필요한 경우에만 3줄을 사용합니다.
정보와 UI 요소를 과도하게 담지 않고, 작업에 필요한 최소 정보만 노출합니다.
```

Variable display info text:

```text
실제 표시 정보(BIN, SKU, 모델명 등), 주요 컬러는 프로젝트별로 정의합니다.
```

## Routine Verification

When needed:

```bash
node --check smart-glass-design-system.js
git diff --check
```

For tiny text/CSS-only edits, user often prefers no heavy verification.
