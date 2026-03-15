const buildingButtons = document.querySelectorAll(".building-link");
const buildingCategoryButtons = document.querySelectorAll(".building-category");
const buildingEmpty = document.getElementById("buildingEmpty");
const buildingModal = document.getElementById("buildingModal");
const buildingModalTitle = document.getElementById("buildingModalTitle");
const buildingModalLevel = document.getElementById("buildingModalLevel");
const buildingModalOutput = document.getElementById("buildingModalOutput");
const buildingModalStorage = document.getElementById("buildingModalStorage");
const buildingModalTime = document.getElementById("buildingModalTime");
const buildingModalClose = document.getElementById("buildingModalClose");

const openBuildingModal = (button) => {
  if (!buildingModal) return;
  const title = button.getAttribute("data-title") || "Building";
  const level = button.getAttribute("data-level") || "-";
  const output = button.getAttribute("data-output") || "-";
  const storage = button.getAttribute("data-storage") || "-";
  const time = button.getAttribute("data-upgrade-time") || "-";
  if (buildingModalTitle) buildingModalTitle.textContent = title;
  if (buildingModalLevel) buildingModalLevel.textContent = level;
  if (buildingModalOutput) buildingModalOutput.textContent = output;
  if (buildingModalStorage) buildingModalStorage.textContent = storage;
  if (buildingModalTime) buildingModalTime.textContent = time;
  buildingModal.classList.remove("hidden");
};

const closeBuildingModal = () => {
  if (!buildingModal) return;
  buildingModal.classList.add("hidden");
};

buildingButtons.forEach((button) => {
  button.addEventListener("click", () => openBuildingModal(button));
});

const applyCategoryFilter = (category) => {
  let visibleCount = 0;
  buildingButtons.forEach((button) => {
    const buttonCategory = button.getAttribute("data-category");
    const isVisible = buttonCategory === category;
    button.style.display = isVisible ? "" : "none";
    if (isVisible) visibleCount += 1;
  });

  if (buildingEmpty) {
    buildingEmpty.style.display = visibleCount === 0 ? "block" : "none";
  }
};

buildingCategoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    buildingCategoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const category = button.getAttribute("data-category");
    if (category) applyCategoryFilter(category);
  });
});

if (buildingCategoryButtons.length > 0) {
  const active = document.querySelector(".building-category.active");
  const initialCategory = active ? active.getAttribute("data-category") : null;
  if (initialCategory) applyCategoryFilter(initialCategory);
}

if (buildingModalClose) {
  buildingModalClose.addEventListener("click", closeBuildingModal);
}

if (buildingModal) {
  buildingModal.addEventListener("click", (e) => {
    if (e.target === buildingModal) {
      closeBuildingModal();
    }
  });
}
