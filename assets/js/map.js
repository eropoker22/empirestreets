const grid = document.getElementById("grid");
const popup = document.getElementById("popup");
const sectorTitle = document.getElementById("sectorTitle");
const mapInner = document.getElementById("mapInner");
const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
const menuItems = document.querySelectorAll(".menu-item");
const menuOpen = document.querySelectorAll(".menu-open");
const mapContainer = document.querySelector(".map-container");
const controls = document.querySelector(".controls");
const eventButtons = document.querySelectorAll(".page-map .event-btn");
const quickLinksModal = document.getElementById("quickLinksModal");
const quickLinksClose = document.getElementById("quickLinksClose");
const unitsModal = document.getElementById("unitsModal");
const unitsClose = document.getElementById("unitsClose");
const unitOpens = document.querySelectorAll(".unit-open");
const unitCloses = document.querySelectorAll(".unit-close");

let zoom = 1;
const minZoom = 0.8;
const maxZoom = 1.6;
const step = 0.1;
let panX = 0;
let panY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

const applyZoom = () => {
  mapInner.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom.toFixed(2)})`;
};

zoomIn.addEventListener("click", () => {
  zoom = Math.min(maxZoom, zoom + step);
  applyZoom();
});

zoomOut.addEventListener("click", () => {
  zoom = Math.max(minZoom, zoom - step);
  applyZoom();
});

controls.addEventListener("pointerdown", (e) => {
  e.stopPropagation();
});

mapContainer.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".controls") || e.target.closest(".popup")) {
    return;
  }
  isDragging = true;
  startX = e.clientX - panX;
  startY = e.clientY - panY;
  mapContainer.setPointerCapture(e.pointerId);
});

mapContainer.addEventListener("pointermove", (e) => {
  if (!isDragging) return;
  panX = e.clientX - startX;
  panY = e.clientY - startY;
  applyZoom();
});

mapContainer.addEventListener("pointerup", (e) => {
  isDragging = false;
  mapContainer.releasePointerCapture(e.pointerId);
});

mapContainer.addEventListener("pointerleave", () => {
  isDragging = false;
});

menuItems.forEach((item) => {
  item.onclick = () => {
    menuItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  };
});

const openQuickLinks = (e) => {
  e.preventDefault();
  const panel = e.currentTarget.dataset.panel;
  if (panel === "units" && unitsModal) {
    unitsModal.classList.remove("hidden");
    return;
  }
  if (quickLinksModal) {
    quickLinksModal.classList.remove("hidden");
  }
};

menuOpen.forEach((item) => item.addEventListener("click", openQuickLinks));

if (quickLinksClose) {
  quickLinksClose.addEventListener("click", () => {
    quickLinksModal.classList.add("hidden");
  });
}

if (quickLinksModal) {
  quickLinksModal.addEventListener("click", (e) => {
    if (e.target === quickLinksModal) {
      quickLinksModal.classList.add("hidden");
    }
  });
}

if (unitsClose) {
  unitsClose.addEventListener("click", () => {
    unitsModal.classList.add("hidden");
  });
}

if (unitsModal) {
  unitsModal.addEventListener("click", (e) => {
    if (e.target === unitsModal) {
      unitsModal.classList.add("hidden");
    }
  });
}

unitOpens.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.currentTarget.dataset.unit;
    const modal = document.getElementById(`${target}Modal`);
    if (modal) {
      modal.classList.remove("hidden");
    }
  });
});

unitCloses.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.currentTarget.dataset.close;
    const modal = document.getElementById(target);
    if (modal) {
      modal.classList.add("hidden");
    }
  });
});

["soldiersModal","defendersModal","weaponsModal","vehiclesModal"].forEach((id) => {
  const modal = document.getElementById(id);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }
});

eventButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const eventItem = e.target.closest(".event");
    if (!eventItem) return;
    let status = eventItem.querySelector(".event-status");
    if (!status) {
      status = document.createElement("div");
      status.className = "event-status";
      eventItem.appendChild(status);
    }
    if (e.target.classList.contains("decline")) {
      status.textContent = "Declined";
      status.style.color = "#ff8080";
    } else {
      status.textContent = "Accepted";
      status.style.color = "#00ffd5";
    }
    const buttons = eventItem.querySelectorAll(".event-btn");
    buttons.forEach((b) => {
      b.disabled = true;
      b.classList.add("disabled");
    });
  });
});

for (let i = 1; i <= 100; i++) {
  const sector = document.createElement("div");
  sector.className = "sector";
  sector.innerText = i;

  sector.onclick = () => {
    sectorTitle.innerText = `Sector ${i}`;
    popup.style.display = "block";
  };

  grid.appendChild(sector);
}

applyZoom();
