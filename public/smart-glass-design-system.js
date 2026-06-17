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

const savePickerLinks = document.querySelectorAll("[data-save-picker]");

savePickerLinks.forEach((link) => {
  link.addEventListener("click", async (event) => {
    if (!window.showSaveFilePicker) {
      return;
    }

    event.preventDefault();

    try {
      const href = link.getAttribute("href");
      const fileName = link.getAttribute("download") || "design.md";
      const response = await fetch(href);
      const content = await response.text();
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
    } catch (error) {
      if (error && error.name === "AbortError") {
        return;
      }

      window.location.href = link.href;
    }
  });
});
