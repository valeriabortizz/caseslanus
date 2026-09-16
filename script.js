(function () {
  const gate = document.getElementById("gate");
  const topbar = document.getElementById("topbar");
  const catalog = document.getElementById("catalog");
  const footer = document.getElementById("footer");
  const modelSelect = document.getElementById("modelSelect");
  const needButtons = Array.from(document.querySelectorAll(".need-btn"));
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const modelChip = document.getElementById("modelChip");

  const MODEL_LABELS = {
    "11": "iPhone 11",
    "12": "iPhone 12",
    "13": "iPhone 13",
    "14": "iPhone 14",
    "15": "iPhone 15",
    "16": "iPhone 16",
    "17": "iPhone 17",
    otro: "Otro modelo",
  };

  const currency = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  let selectedModel = null;

  modelSelect.addEventListener("change", () => {
    selectedModel = modelSelect.value;
    needButtons.forEach((btn) => (btn.disabled = !selectedModel));
  });

  needButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!selectedModel) return;
      renderCatalog(selectedModel);
      openCatalog(btn.dataset.target);
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      goToPanel(tab.dataset.target);
    });
  });

  modelChip.addEventListener("click", () => {
    catalog.hidden = true;
    topbar.hidden = true;
    footer.hidden = true;
    gate.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function renderCatalog(model) {
    Object.keys(PRODUCTS).forEach((category) => {
      const panel = document.getElementById(category);
      const grid = panel.querySelector("[data-grid]");
      const note = panel.querySelector("[data-note]");
      const items = PRODUCTS[category].filter(
        (p) => model === "otro" || p.compat.includes("all") || p.compat.includes(model)
      );

      note.textContent =
        model === "otro"
          ? "Mostrando el catálogo completo. Confirmanos tu modelo exacto para asegurar la compatibilidad."
          : `Compatible con ${MODEL_LABELS[model]}`;

      grid.innerHTML = "";

      if (items.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "Todavía no tenemos productos cargados para este modelo en esta categoría.";
        grid.appendChild(empty);
        return;
      }

      items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "card";
        const thumb = item.image
          ? `<img src="${item.image}" alt="${item.title}">`
          : item.icon || "";
        card.innerHTML = `
          <div class="card-thumb${item.image ? " has-image" : ""}">${thumb}</div>
          <div class="card-title">${item.title}</div>
          <div class="card-compat">${item.compat.includes("all") ? "Todos los modelos" : item.compat.map((m) => "iPhone " + m).join(" / ")}</div>
          <div class="card-price">${currency.format(item.price)}</div>
          ${item.note ? `<div class="card-note">${item.note}</div>` : ""}
        `;
        grid.appendChild(card);
      });
    });
  }

  function openCatalog(target) {
    gate.hidden = true;
    topbar.hidden = false;
    catalog.hidden = false;
    footer.hidden = false;
    modelChip.textContent = MODEL_LABELS[selectedModel];
    goToPanel(target);
  }

  function goToPanel(target) {
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.target === target));
    document.getElementById(target).scrollIntoView({ behavior: "smooth", block: "start" });
  }
})();
