# Base UI Kit — Design System

**Source:** Figma file `Base UI Kit_Web Dashboard.fig` (attached to this project)
**Tagline:** "와이어프레임과 디자인 간 격차를 줄이기 위한 Mid-Fidelity UI"
*(A mid-fidelity UI kit to close the gap between wireframes and final designs)*

Base UI Kit is a **mid-fidelity web dashboard system** built primarily for Korean public-sector and enterprise dashboards. It targets information-dense admin tooling — drone management, device inventory, logistics (피킹/패킹), system administration — where clarity, hierarchy, and legibility of Korean and Latin text matter more than visual flourish.

The kit deliberately occupies the space *between* wireframes and high-fidelity comps: it commits to a real typography ramp, a real color system, and real interaction components, but its overall visual register is restrained, neutral, and "office-grade" — closer to govt admin tools (gov.kr) than to consumer SaaS.

## Sources

- **Figma file:** `Base UI Kit_Web Dashboard.fig` — 28 pages, 83 frames. Includes color/type/spacing style guide, full icon library (Vuesax linear + bold), buttons, form controls, tables, modals, pagination, tooltips, infoboxes, sidebars (GNB), and several reference dashboard screens.
- **Reference dashboard:** "드론 관리" (Drone Management) — page19 / Frame-1430105799.

## Index

| File | Purpose |
| --- | --- |
| `README.md` | This document — system overview, content tone, visual foundations, iconography. |
| `SKILL.md`  | Agent Skill manifest — load this skill in Claude Code to design with Base UI Kit. |
| `colors_and_type.css` | All color, type, spacing, radius, shadow tokens as CSS vars + utility classes. |
| `icons.css` | Vuesax icon classes (Iconify CDN). Use `<span class="icon i-search">` to render. |
| `fonts/` | Pretendard TTFs (Thin → Black). Brand-supplied. |
| `assets/logos/` | Base UI Kit logo (horizontal + mark). |
| `preview/` | One small HTML card per design-system token cluster. Surfaces in the Design System tab. |
| `ui_kits/web-dashboard/` | Interactive React recreation of the drone-management dashboard. Start with `index.html`. |
| `colors_and_type.css` | All CSS custom properties + semantic type rules. Import this first. |
| `fonts/` | Pretendard, Pretendard GOV (subset), Noto Sans KR. Latin uses Inter as Product Sans fallback (see Caveats). |
| `assets/icons/` | Vuesax linear + bold SVGs copied directly out of the Figma. |
| `assets/logos/` | "H" brand mark used in the reference dashboard. |
| `preview/` | Design system specimen cards (rendered in the Design System tab). |
| `ui_kits/web-dashboard/` | Pixel-faithful UI kit recreation: sidebar (GNB), tables, modals, buttons, infoboxes, pagination, tabs. Includes click-thru `index.html`. |
| `SKILL.md` | Agent-Skills compatible entry point for Claude Code. |

## Content fundamentals

The kit is **bilingual Korean (primary) + English (secondary / labels)**. Almost every UI label in the source ships as Korean, with English appearing as section headers in the style guide ("Color (색상)", "Typography (타이포그래피)").

**Voice:**
- Plain, declarative, instructional — the tone of public-sector and enterprise admin tooling.
- Korean uses the **plain/formal "-다" sentence form** in descriptions ("색상은 사용자의 주의를 유도하고… 직관적인 사용자 경험을 제공한다.").
- UI labels for actions are **terse, 2–4 syllable verbs**: 취소 (Cancel), 예 (Yes), 다음 (Next), 이전 (Previous), 로그아웃 (Logout), 다운로드 (Download), 기체 등록 (Register Device).
- Confirmation dialogs use the polite "-습니까?" interrogative: "이 상품을 지우시겠습니까?" ("Do you want to delete this item?").
- Status copy is single nouns or noun phrases: 검수 완료 (Inspection complete), 검수 미완료 (Inspection incomplete).
- Placeholders use "-하세요" requests: "검색어를 입력하세요" ("Enter a search term").

**Casing & punctuation:**
- English headings: **Title Case** for system terms ("Display", "Heading", "Body", "System"), **lowercase** for token names ("body-large", "heading-medium", "primary-50").
- Korean does not use casing — only sentence breaks.
- No exclamation marks. No question marks except in confirmation dialogs.

**Pronouns:** Korean UI here generally omits subjects (typical for the language). English is reserved for token names, status badges, and code-adjacent labels — first/second person is not used in the source material.

**Emoji:** **None.** The kit is emoji-free. State and meaning are carried by **Vuesax icons + semantic color**, never by emoji.

**Vibe:** restrained, civic, mid-fidelity. Imagine a clean Korean government services portal that's been stripped down to its skeleton — every element clearly there, nothing showing off.

## Visual foundations

**Color**
- Neutral-dominant. The most-used color across the entire system is **`rgb(41,45,50)`** — a near-black charcoal used for body text, stroke, and fill (6,000+ occurrences in the source).
- **Primary blue: `#256EF4`** (rgb 37,110,244). Used for primary buttons, links, focused tabs, selected pagination, checked checkboxes, info icons. ~130 uses.
- **Gray ramp:** 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 — the 100-step values rendered as flat swatches in the style guide page. Surface defaults `#F5F5F5` and `#FFFFFF`. Border default `#DDDDDD`.
- **Semantic system colors:**
  - Danger (위험): `#FB2C36` with surface tint `#FEF2F2` and border `#FFD8D8`.
  - Success (성공): `#00A419` with light-green surface.
  - Information (안내): `#256EF4` with surface tint `#ECF2FE` and stripe `#D8E5FD`.
- **Deep navy accents:** `#063A74` and `#083891` are used for table header strokes and government-style emphasis.

**Type**
- Primary Korean: **Pretendard GOV** (a public-sector variant of Pretendard). Body face for most app surfaces.
- Secondary Korean: **Pretendard** and **Noto Sans KR** (interchangeably across screens — Pretendard for sidebar/menu, Noto for table content).
- Latin display: **Product Sans** for the big "Base UI Kit" hero (substituted — see Caveats).
- Latin body: **Inter** sparingly, for code-adjacent labels.
- **Scale:** Display large/medium/small → Heading large 32 / medium 28 / small 24 / xsmall 19 / xxsmall 17 → Body medium 17 / small 15 / xsmall 13. Line-height is **1.5 throughout**. Letter-spacing 0 except a slight `-0.030em` on display sizes.

**Spacing & layout**
- Module padding: 24px / 40px / 64px.
- Card inner padding: typically 40px on style-guide swatches, 24px on app surfaces.
- Section gaps: 28px / 40px / 52px.
- Side navigation (GNB) fixed at **300px wide**. Top bar **72px tall**. Main content padding `40px 64px`.
- Slide/canvas: 1920×1080 for the hero, 1016px content column for documentation frames.

**Radius**
- Cards & info banners: **16px**.
- Buttons & inputs: **8px** (also `0 8px 8px 0` for asymmetric info-banner shells).
- Badges: **6px**.
- Pills / tags / "logout" button: **100px** (full round).
- Logo / icon containers: **2px** (almost square).

**Borders**
- 1px solid `#DDDDDD` everywhere by default. Dashed `1px dashed #B0B0B0` for **subtle dividers between documentation sections** — a signature of this kit.
- Header strokes use deep navy `#063A74` for table titles.

**Shadows**
- Very light. Source uses `rgba(0,0,0,0.02)` and `rgba(0,0,0,0.05)` for cards. Sidebar uses an offset `6px 2px 10px rgba(0,0,0,0.05)`. Modal backdrop is `rgba(0,0,0,0.75)`.
- No glow, no colored shadows.

**Backgrounds**
- Flat fills only. Surface 1 = `#FFFFFF`, surface 2 = `#F5F5F5`. No gradients (except a very subtle one inside the brand mark itself), no textures, no images-as-background, no noise.
- The reference dashboard sits on `#F5F5F5` with white modules.

**Animation**
- Pure mid-fidelity. No motion specified in the source. Treat interactions as **150ms ease-out** for hover/press by default, but do not invent springs or bounces.

**Hover / press states**
- Buttons: primary darkens to ~`#083891` on hover, presses use the same color with slight inset.
- Secondary (ghost) buttons: white with primary border → primary 5% tint on hover.
- Sidebar menu items: selected = lighter gray `#5C5C5C` row on a `#404040` sidebar; hover = same lighter gray.

**Transparency & blur**
- Used only for the modal backdrop (`rgba(0,0,0,0.75)`). No backdrop-filter blur in the source.

**Imagery**
- Effectively **no photography** in the kit. The single non-icon raster is the small brand "H" logo (40×40 PNG). Reference dashboards are tables of synthetic data — no avatars, no charts, no illustration.

**Cards**
- Flat. `1px solid #DDDDDD` border or no border. 16px radius. Optional `rgba(0,0,0,0.02)` shadow. Padding 24/40px.

**Layout fixed elements**
- Left sidebar GNB always present at 300px. Header strip 72px with logout button right-aligned. Main content scrolls inside the remaining viewport.

## Iconography

**System:** [Vuesax](https://vuesax.com/) icon set, used in **two weights**:
- `vuesax/linear/*` — the default UI weight. 1.5px stroke, 24×24 nominal.
- `vuesax/bold/*` — used only inside small filled chips, status pills, and to call out semantic meaning (e.g. `vuesax/bold/info-circle` inside the blue info banner).

Real SVGs from the Figma have been copied into `assets/icons/{linear,bold}/`. **Never** redraw these by hand — always reference the real SVGs.

**Recurring icons in the source (top 15):**
`arrow-right`, `arrow-down`, `arrow-left`, `glass` (menu/dashboard), `calendar`, `info-circle` (bold), `tick-circle` (bold), `close`, `close-circle` (bold), `add-circle`, `eye`, `search`, `search-normal`, `import`, `3dcube`.

**Use:**
- Always 24×24 in the menu / page chrome.
- 20×20 inside info-banner headers and status chips.
- 16×16 inside table cells when used inline with text.
- Color comes from the surrounding context — icons inherit the text color of their parent, except status icons which take the semantic color.

**Other:**
- **No emoji** anywhere.
- **No unicode dingbat / arrow characters** as icons — even arrows in pagination ("< 이전" / "다음 >") are rendered with real `<` `>` chevrons from text in the source.

## Caveats — please help me iterate

- **Product Sans** is Google's proprietary brand typeface and not redistributable. The 135px "Base UI Kit" hero in the Figma uses it; I've substituted **Inter** in `colors_and_type.css` because it's the closest open-source neo-grotesque with similar metrics. If you need true Product Sans, please drop the .ttf into `fonts/`.
- **Pretendard GOV** is the Korean public-sector variant. I'm pulling the standard Pretendard webfont from the official CDN as a near-perfect substitute. If you have the GOV-licensed files locally, drop them in `fonts/` and I'll wire them up.
- The Figma is a **mid-fidelity kit, not a finished product**. I've recreated what's actually there; please tell me which dashboard surfaces you want fleshed out further (drone mgmt? device inventory? login? picking/packing?).

**Bold ask:** review the cards in the Design System tab and the `ui_kits/web-dashboard/index.html` prototype, and tell me which components you'd like sharpened or extended. I'd especially like direction on (1) whether to add a Pretendard-GOV-licensed copy of the fonts, (2) which dashboard flows to build out as full click-thru prototypes, and (3) whether you want a light/dark variant or only the current light kit.
