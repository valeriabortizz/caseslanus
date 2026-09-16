(function () {
  const gate = document.getElementById("gate");
  const topbar = document.getElementById("topbar");
  const catalog = document.getElementById("catalog");
  const footer = document.getElementById("footer");
  const modelSelect = document.getElementById("modelSelect");
  const needButtons = Array.from(document.querySelectorAll(".need-btn"));
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const modelChip = document.getElementById("modelChip");
  const brandPopover = document.getElementById("brandPopover");
  const brandBackdrop = document.getElementById("brandBackdrop");
  const popoverClose = document.getElementById("popoverClose");
  const logoTriggers = Array.from(document.querySelectorAll(".brand-logo, .gate-logo"));

  function openBrandPopover() {
    brandPopover.hidden = false;
    brandBackdrop.hidden = false;
  }

  function closeBrandPopover() {
    brandPopover.hidden = true;
    brandBackdrop.hidden = true;
  }

  logoTriggers.forEach((logo) => {
    logo.addEventListener("click", (e) => {
      e.stopPropagation();
      if (brandPopover.hidden) openBrandPopover();
      else closeBrandPopover();
    });
  });

  popoverClose.addEventListener("click", closeBrandPopover);
  brandBackdrop.addEventListener("click", closeBrandPopover);

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

  const MODEL_INDEPENDENT_CATEGORIES = ["accesorios"];

  let selectedModel = null;

  modelSelect.addEventListener("change", () => {
    selectedModel = modelSelect.value;
    needButtons.forEach((btn) => {
      if (MODEL_INDEPENDENT_CATEGORIES.includes(btn.dataset.target)) return;
      btn.disabled = !selectedModel;
    });
  });

  needButtons.forEach((btn) => {
    const target = btn.dataset.target;
    if (MODEL_INDEPENDENT_CATEGORIES.includes(target)) btn.disabled = false;

    btn.addEventListener("click", () => {
      const isModelIndependent = MODEL_INDEPENDENT_CATEGORIES.includes(target);
      if (!selectedModel && !isModelIndependent) return;
      renderCatalog(selectedModel || "otro");
      openCatalog(target);
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
      const isModelIndependent = MODEL_INDEPENDENT_CATEGORIES.includes(category);
      const items = PRODUCTS[category];

      note.textContent = isModelIndependent
        ? "Accesorios para cualquier modelo de iPhone."
        : model === "otro"
          ? "Mostrando el catálogo completo. Confirmanos tu modelo exacto para asegurar la compatibilidad."
          : `Te marcamos qué es compatible con ${MODEL_LABELS[model]} — igual podés ver todo el catálogo.`;

      grid.innerHTML = "";

      if (items.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "Todavía no tenemos productos cargados en esta categoría.";
        grid.appendChild(empty);
        return;
      }

      items.forEach((item) => {
        const isCompatible =
          isModelIndependent || model === "otro" || item.compat.includes("all") || item.compat.includes(model);
        const card = document.createElement("article");
        card.className = "card" + (isCompatible ? "" : " card-incompatible");
        const thumb = item.image
          ? `<img src="${item.image}" alt="${item.title}">`
          : item.icon || "";
        const flag = isModelIndependent
          ? ""
          : isCompatible
            ? `<div class="card-flag ok">✔ Compatible con tu iPhone</div>`
            : `<div class="card-flag warn">⚠ No es para tu iPhone</div>`;
        card.innerHTML = `
          <div class="card-thumb${item.image ? " has-image" : ""}">${thumb}</div>
          <div class="card-title">${item.title}</div>
          <div class="card-compat">${item.compat.includes("all") ? "Todos los modelos" : item.compat.map((m) => "iPhone " + m).join(" / ")}</div>
          <div class="card-price">${currency.format(item.price)}</div>
          ${item.note ? `<div class="card-note">${item.note}</div>` : ""}
          ${flag}
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
    modelChip.textContent = selectedModel ? MODEL_LABELS[selectedModel] : "Elegir modelo";
    goToPanel(target);
  }

  function goToPanel(target) {
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.target === target));
    document.getElementById(target).scrollIntoView({ behavior: "smooth", block: "start" });
  }
})();
