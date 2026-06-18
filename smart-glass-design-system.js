const normalizeText = (value) => value.replace(/\s+/g, " ").trim();

const prepareColorTokenTable = () => {
  const table = document.querySelector(".color-token-table");

  if (!table) {
    return;
  }

  table.querySelectorAll("tr").forEach((row) => {
    const cells = Array.from(row.children);

    if (cells.length !== 4 && cells.length !== 5) {
      return;
    }

    const hasRoleColumn = cells.length === 5;
    const roleCell = hasRoleColumn ? cells[1] : null;
    const tokenCell =
      row.querySelector(".token-name") ||
      cells.find((cell) => cell.textContent.trim() === "토큰") ||
      cells[hasRoleColumn ? 2 : 1];
    const valueCell =
      row.querySelector("[data-token-value]")?.closest("td") ||
      cells.find((cell) => cell.textContent.trim() === "값") ||
      cells[cells.length - 1];
    const typeCell =
      row.querySelector(".token-type") ||
      cells.find((cell) => cell.textContent.trim() === "유형") ||
      cells[0];

    roleCell?.remove();
    row.insertBefore(tokenCell, typeCell?.nextSibling || valueCell);

    if (tokenCell.tagName !== "TD" || tokenCell.querySelector("[data-copy]")) {
      return;
    }

    const token = tokenCell.textContent.trim();
    const tokenText = document.createElement("span");

    tokenText.textContent = token;
    tokenText.className = "token-copy-text";
    tokenText.setAttribute("data-copy", token);
    tokenText.setAttribute("role", "button");
    tokenText.setAttribute("tabindex", "0");
    tokenText.setAttribute("aria-label", `${token} 복사`);
    tokenText.setAttribute("title", `${token} 복사`);

    tokenCell.textContent = "";
    tokenCell.append(tokenText);

    const editableValue = valueCell?.querySelector("[data-token-value]");
    const valueButton = valueCell?.querySelector(".copy-button.copy-icon");
    const value = normalizeText(editableValue?.textContent || "");

    valueButton?.remove();

    if (editableValue) {
      editableValue.classList.add("token-copy-text");
      editableValue.setAttribute("data-copy", value);
      editableValue.setAttribute("role", "button");
      editableValue.setAttribute("tabindex", "0");
      editableValue.setAttribute("aria-label", `${value} 복사`);
      editableValue.setAttribute("title", `${value} 복사`);
    }
  });
};

prepareColorTokenTable();

const prepareTokenNameCopyText = () => {
  document.querySelectorAll("td.token-name").forEach((tokenCell) => {
    if (tokenCell.querySelector("[data-copy]")) {
      return;
    }

    const token = tokenCell.textContent.trim();
    const tokenText = document.createElement("span");

    tokenText.textContent = token;
    tokenText.className = "token-copy-text";
    tokenText.setAttribute("data-copy", token);
    tokenText.setAttribute("role", "button");
    tokenText.setAttribute("tabindex", "0");
    tokenText.setAttribute("aria-label", `${token} 복사`);
    tokenText.setAttribute("title", `${token} 복사`);

    tokenCell.textContent = "";
    tokenCell.append(tokenText);
  });
};

prepareTokenNameCopyText();

const mergeTokenTypeCells = () => {
  document.querySelectorAll("#tokens .token-table").forEach((table) => {
    const headers = Array.from(table.querySelectorAll("thead th")).map((header) =>
      normalizeText(header.textContent || ""),
    );
    const typeIndex = headers.findIndex((header) => header === "유형" || header === "Type");

    if (typeIndex < 0) {
      return;
    }

    let activeCell = null;
    let activeText = "";
    let activeSpan = 1;

    table.querySelectorAll("tbody tr").forEach((row) => {
      const cells = Array.from(row.children);
      const typeCell = cells[typeIndex];

      if (!typeCell) {
        return;
      }

      const typeText = normalizeText(typeCell.textContent || "");

      if (activeCell && typeText === activeText) {
        activeSpan += 1;
        activeCell.rowSpan = activeSpan;
        typeCell.remove();
        return;
      }

      activeCell = typeCell;
      activeText = typeText;
      activeSpan = 1;
      activeCell.rowSpan = 1;
    });
  });
};

mergeTokenTypeCells();

const writeClipboardText = async (value) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall back for file:// previews or browsers that block the Clipboard API.
    }
  }

  const textarea = document.createElement("textarea");

  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Copy command failed");
  }
};

const copyValue = async (copyTarget) => {
  const value = copyTarget.getAttribute("data-copy") || "";
  const originalText = copyTarget.textContent;
  const isIconButton = copyTarget.classList.contains("copy-icon");
  const isTokenText = copyTarget.classList.contains("token-copy-text");

  try {
    await writeClipboardText(value);
    if (!isIconButton && !isTokenText) {
      copyTarget.textContent = "복사됨";
    }
    copyTarget.classList.add("is-copied");

    window.setTimeout(() => {
      if (!isIconButton && !isTokenText) {
        copyTarget.textContent = originalText;
      }
      copyTarget.classList.remove("is-copied");
    }, 1200);
  } catch {
    if (!isIconButton && !isTokenText) {
      copyTarget.textContent = "복사 실패";
    }

    window.setTimeout(() => {
      if (!isIconButton && !isTokenText) {
        copyTarget.textContent = originalText;
      }
    }, 1200);
  }
};

document.addEventListener("click", (event) => {
  const copyTarget = event.target.closest("[data-copy]");

  if (!copyTarget) {
    return;
  }

  event.preventDefault();
  copyValue(copyTarget);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  const copyTarget = event.target.closest("[data-copy]");

  if (!copyTarget) {
    return;
  }

  event.preventDefault();
  copyValue(copyTarget);
});

const tokenGroupLabels = {
  "색상 토큰": "Color Tokens",
  "타이포그래피 토큰": "Typography Tokens",
  "안전 여백과 간격": "Safe Area and Spacing Tokens",
};

const tokenUsageLabels = {
  "color/background/scan-toast": "Barcode scan toast",
  "color/background/primary": "Primary action, voice-command selection, active state",
  "color/background/primary-subtle": "Sub-primary surface and supporting icon color on primary surfaces",
  "color/background/subtle": "Secondary gray surface",
  "color/background/disabled": "Disabled gray surface",
  "color/background/white": "Information surface and secondary button",
  "color/background/dark": "Camera-off selection UI and status screens",
  "color/background/dark-subtle": "Secondary surface inside dark screens",
  "color/background/camera-overlay": "Secondary information over camera view",
  "color/background/selected": "Selected option when multiple choices are shown",
  "color/background/success": "Success or completed state surface",
  "color/background/warning": "Warning or needs-confirmation state surface",
  "color/background/error": "Error or stop state surface",
  "color/background/issue": "Issue or needs-confirmation card",
  "color/line/divider": "Divider and disabled state",
  "color/line/light": "Light divider on dark screens",
  "color/line/strong": "Strong divider on light screens",
  "color/line/dark": "Dark surfaces",
  "color/line/selected": "Selected option and voice command button",
  "color/line/warning": "Warning or needs-confirmation outline",
  "color/line/error": "Error or stop outline",
  "color/line/issue": "Issue or needs-confirmation outline",
  "color/text/primary": "Primary information on light screens",
  "color/text/primary-subtle": "Supporting icon or secondary information on white or primary surfaces",
  "color/text/muted": "Disabled state and secondary information",
  "color/text/on-dark": "Information on dark screens",
  "color/text/success": "Success or completed message",
  "color/text/warning": "Warning or needs-confirmation message",
  "color/text/error": "Error or stop message",
  "color/text/issue": "Issue or needs-confirmation message",
  "color/opacity/completed": "Completed or issue list rows",
  "color/opacity/unselected": "Unselected choices while another choice is selected",
  "font/family/base": "Base UI font",
  "font/data/lg": "Large primary data",
  "font/data/md": "Medium primary data",
  "font/data/sm": "Small primary data",
  "font/instruction/main": "Primary work instruction",
  "font/button/main": "Primary button text",
  "font/info/lg": "Large secondary information",
  "font/info/md": "Medium secondary information",
  "font/info/sm": "Small secondary information",
  "font/button/sub": "Secondary button text",
  "font/caption": "Caption and secondary status text",
  "safe/top": "Top safe area for every screen",
  "safe/bottom": "Bottom safe area for every screen",
  "safe/side": "Left and right safe area for every screen",
  "radius/container": "Outer container radius",
  "radius/toast": "Toast and pill button radius",
  "space/padding/ui": "Internal UI padding scale",
  "space/padding/icon-pill": "Asymmetric padding for icon pills where icon-side padding is smaller than text-side padding",
};

const readCellText = (cell) => {
  const editableValue = cell.querySelector("[data-token-value]");

  if (editableValue) {
    return normalizeText(editableValue.textContent || "");
  }

  const clone = cell.cloneNode(true);
  clone.querySelectorAll("button").forEach((button) => button.remove());

  return normalizeText(clone.textContent || "");
};

const readLogicalTableRows = (table) => {
  const activeSpans = [];

  return Array.from(table.querySelectorAll("tbody tr")).map((row) => {
    const logicalCells = [];
    const physicalCells = Array.from(row.children);
    let physicalIndex = 0;

    for (let logicalIndex = 0; physicalIndex < physicalCells.length || activeSpans[logicalIndex]; logicalIndex += 1) {
      const activeSpan = activeSpans[logicalIndex];

      if (activeSpan) {
        logicalCells[logicalIndex] = activeSpan.cell;
        activeSpan.remaining -= 1;

        if (activeSpan.remaining <= 0) {
          activeSpans[logicalIndex] = null;
        }

        continue;
      }

      const cell = physicalCells[physicalIndex];

      if (!cell) {
        continue;
      }

      logicalCells[logicalIndex] = cell;
      physicalIndex += 1;

      const rowSpan = Number(cell.getAttribute("rowspan") || 1);

      if (rowSpan > 1) {
        activeSpans[logicalIndex] = {
          cell,
          remaining: rowSpan - 1,
        };
      }
    }

    return logicalCells;
  });
};

const readTokenGroups = () =>
  Array.from(document.querySelectorAll("#tokens .token-section > div")).map((group) => {
    const table = group.querySelector("table");
    const visibleTitle = normalizeText(group.querySelector("h3")?.textContent || "Tokens");
    const title = tokenGroupLabels[visibleTitle] || visibleTitle;
    const headers = Array.from(group.querySelectorAll("thead th")).map((header) =>
      normalizeText(header.textContent || ""),
    );
    const indexOf = (...labels) => headers.findIndex((header) => labels.includes(header));
    const rows = readLogicalTableRows(table).map((cells) => {
      const typeIndex = indexOf("유형", "Type");
      const tokenIndex = indexOf("토큰", "Token");
      const usageIndex = indexOf("사용처", "Usage");
      const valueIndex = indexOf("값", "Value");
      const type = typeIndex >= 0 && cells[typeIndex] ? readCellText(cells[typeIndex]) : "";
      const token = tokenIndex >= 0 && cells[tokenIndex] ? readCellText(cells[tokenIndex]) : "";

      return {
        type,
        token,
        usage: tokenUsageLabels[token] || (usageIndex >= 0 && cells[usageIndex] ? readCellText(cells[usageIndex]) : ""),
        value: valueIndex >= 0 && cells[valueIndex] ? readCellText(cells[valueIndex]) : "",
      };
    });

    return { title, rows };
  });

const buildMarkdownTable = (rows) => {
  const hasTypeColumn = rows.some((row) => row.type);

  const tableRows = rows.map((row) => {
    if (hasTypeColumn) {
      return `| ${row.type} | ${row.usage} | ${row.value} | \`${row.token}\` |`;
    }

    return `| \`${row.token}\` | ${row.value} | ${row.usage} |`;
  });

  if (hasTypeColumn) {
    return ["| Type | Usage | Value | Token |", "| --- | --- | --- | --- |", ...tableRows].join("\n");
  }

  return ["| Token | Value | Usage |", "| --- | --- | --- |", ...tableRows].join("\n");
};

const buildDesignMarkdown = () => {
  const tokenGroups = readTokenGroups();
  const tokenSections = tokenGroups
    .map((group) => `### ${group.title}\n\n${buildMarkdownTable(group.rows)}`)
    .join("\n\n");

  return `# Logistics Smart Glass Design Guide

This file is generated from the current design system page. If token values are edited on the page, the downloaded Markdown reflects the edited values.

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

Use semantic color roles, not numeric color scales. Do not use names like \`success-5\`, \`blue-60\`, or \`gray-100\` as the main token exposed to AI.

- Use the \`Type\` column to show where the color is applied: \`background\`, \`line\`, \`text\`, or \`opacity\`.
- Use the \`Usage\` column to explain intent and context in plain language, such as primary action, selected state, dark screen, success feedback, warning, error, or issue state.
- When hierarchy is needed, keep it visible in the token name with obvious suffixes such as \`sub\`, \`dark\`, or \`on-dark\`.
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

The following token values are copied from the visible token tables at download time.

Use a 4px spacing scale by default. Add 2px exceptions only when the HUD component needs tighter optical alignment.

${tokenSections}

## Screen Generation Prompt Shape

\`\`\`text
Work type:
Screen type:
Background type:
Display fields:
Field priority:
Primary input method:
Voice commands:
Completion/error state:
Customer brand color:
\`\`\`
`;
};

const refreshColorToken = (editable) => {
  const value = normalizeText(editable.textContent || "");
  const wrapper = editable.closest(".color-token-value");
  const swatch = wrapper?.querySelector(".swatch");
  const copyTarget = wrapper?.querySelector("[data-token-value]");
  const isHexColor = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(value);
  const isCssColor = window.CSS?.supports?.("color", value);

  if (swatch && (isHexColor || isCssColor)) {
    swatch.style.background = value;
  }

  if (copyTarget) {
    copyTarget.setAttribute("data-copy", value);
    copyTarget.setAttribute("aria-label", `${value} 복사`);
    copyTarget.setAttribute("title", `${value} 복사`);
  }
};

document.querySelectorAll("[data-token-value]").forEach((editable) => {
  editable.addEventListener("input", () => {
    refreshColorToken(editable);
  });
});

const savePickerLinks = document.querySelectorAll("[data-save-picker]");

savePickerLinks.forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();

    const fileName = link.getAttribute("download") || "design.md";
    const content = buildDesignMarkdown();

    try {
      if (window.showSaveFilePicker) {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "Markdown file",
              accept: { "text/markdown": [".md"] },
            },
          ],
        });
        const writable = await handle.createWritable();

        await writable.write(content);
        await writable.close();
        return;
      }

      const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
      const objectUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");

      downloadLink.href = objectUrl;
      downloadLink.download = fileName;
      downloadLink.click();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch (error) {
      if (error && error.name === "AbortError") {
        return;
      }

      const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
      const objectUrl = URL.createObjectURL(blob);

      window.location.href = objectUrl;
    }
  });
});

const parallaxSections = Array.from(document.querySelectorAll(".section"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const updateParallax = () => {
  if (reduceMotion.matches) {
    return;
  }

  const viewportCenter = window.innerHeight / 2;

  parallaxSections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const speed = index % 2 === 0 ? 0.035 : 0.05;
    const offset = Math.max(-28, Math.min(28, (viewportCenter - sectionCenter) * speed));

    section.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
  });
};

let parallaxFrame = 0;

const requestParallaxUpdate = () => {
  if (parallaxFrame) {
    return;
  }

  parallaxFrame = window.requestAnimationFrame(() => {
    parallaxFrame = 0;
    updateParallax();
  });
};

window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
window.addEventListener("resize", requestParallaxUpdate);
updateParallax();

const revealItems = Array.from(
  document.querySelectorAll(
    ".hero, .section-header, .panel, .token-table, .color-ratio-card, .layout-demo, .component-list, .pattern-grid, .prompt-box",
  ),
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal-item");
  item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 35}ms`);
});

if (reduceMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-revealed"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -4% 0px",
      threshold: 0.02,
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
