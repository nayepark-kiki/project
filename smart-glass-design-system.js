const copyButtons = document.querySelectorAll("[data-copy]");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy") || "";
    const originalText = button.textContent;
    const isIconButton = button.classList.contains("copy-icon");

    try {
      await navigator.clipboard.writeText(value);
      if (!isIconButton) {
        button.textContent = "복사됨";
      }
      button.classList.add("is-copied");

      window.setTimeout(() => {
        if (!isIconButton) {
          button.textContent = originalText;
        }
        button.classList.remove("is-copied");
      }, 1400);
    } catch {
      if (!isIconButton) {
        button.textContent = "복사 실패";
      }

      window.setTimeout(() => {
        if (!isIconButton) {
          button.textContent = originalText;
        }
      }, 1400);
    }
  });
});

const normalizeText = (value) => value.replace(/\s+/g, " ").trim();

const tokenGroupLabels = {
  "색상 토큰": "Color Tokens",
  "타이포그래피 토큰": "Typography Tokens",
  "안전 여백과 간격": "Safe Area and Spacing Tokens",
};

const tokenUsageLabels = {
  "color/background/scan-toast": "Barcode scan toast background",
  "color/background/primary": "Primary action, voice-command selection, active state",
  "color/background/primary-subtle": "Sub-primary background and supporting icon color on primary surfaces",
  "color/background/subtle": "Secondary gray surface background",
  "color/background/disabled": "Disabled gray background",
  "color/background/white": "Information surface and secondary button background",
  "color/background/dark": "Camera-off background for selection UI and status screens",
  "color/background/dark-subtle": "Secondary surface inside dark backgrounds",
  "color/background/camera-overlay": "Overlay background for secondary information over camera view",
  "color/background/selected": "Selected option background when multiple choices are shown",
  "color/background/completed-opacity": "Opacity for completed or issue list rows",
  "color/background/unselected-opacity": "Opacity for unselected choices while another choice is selected",
  "color/line/divider": "Divider and disabled border",
  "color/line/dark": "Border on dark backgrounds",
  "color/line/selected": "Selected option border and voice command button border",
  "color/text/primary-subtle": "Supporting icon or secondary text on white or primary backgrounds",
  "color/text/muted": "Disabled text and secondary information",
  "color/text/on-dark": "Text on dark backgrounds",
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

const readTokenGroups = () =>
  Array.from(document.querySelectorAll("#tokens .token-section > div")).map((group) => {
    const visibleTitle = normalizeText(group.querySelector("h3")?.textContent || "Tokens");
    const title = tokenGroupLabels[visibleTitle] || visibleTitle;
    const rows = Array.from(group.querySelectorAll("tbody tr")).map((row) => {
      const cells = row.querySelectorAll("td");
      const token = readCellText(cells[0]);

      return {
        token,
        usage: tokenUsageLabels[token] || readCellText(cells[1]),
        value: readCellText(cells[2]),
      };
    });

    return { title, rows };
  });

const buildMarkdownTable = (rows) => {
  const tableRows = rows.map(
    (row) => `| \`${row.token}\` | ${row.value} | ${row.usage} |`
  );

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
- Use camera HUD screens for work guidance and scanning. Use camera-off screens for lists, category selection, issue reporting, and completion states.
- Treat customer-specific fields, terminology, colors, and task order as configurable.

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
  const button = wrapper?.querySelector("[data-copy]");
  const isHexColor = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(value);
  const isCssColor = window.CSS?.supports?.("color", value);

  if (swatch && (isHexColor || isCssColor)) {
    swatch.style.background = value;
  }

  if (button) {
    button.setAttribute("data-copy", value);
    button.setAttribute("aria-label", `${value} 복사`);
    button.setAttribute("title", `${value} 복사`);
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
