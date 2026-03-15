const unitButtons = document.querySelectorAll(".unit-link");
const unitCategoryButtons = document.querySelectorAll(".unit-category");
const unitEmpty = document.getElementById("unitEmpty");
const unitModal = document.getElementById("unitModal");
const unitModalTitle = document.getElementById("unitModalTitle");
const unitModalLevel = document.getElementById("unitModalLevel");
const unitModalBonus = document.getElementById("unitModalBonus");
const unitModalRole = document.getElementById("unitModalRole");
const unitModalTime = document.getElementById("unitModalTime");
const unitModalClose = document.getElementById("unitModalClose");

const openUnitModal = (button) => {
  if (!unitModal) return;
  const title = button.getAttribute("data-title") || "Unit";
  const level = button.getAttribute("data-level") || "-";
  const bonus = button.getAttribute("data-bonus") || "-";
  const role = button.getAttribute("data-role") || "-";
  const time = button.getAttribute("data-train-time") || "-";
  if (unitModalTitle) unitModalTitle.textContent = title;
  if (unitModalLevel) unitModalLevel.textContent = level;
  if (unitModalBonus) unitModalBonus.textContent = bonus;
  if (unitModalRole) unitModalRole.textContent = role;
  if (unitModalTime) unitModalTime.textContent = time;
  unitModal.classList.remove("hidden");
};

const closeUnitModal = () => {
  if (!unitModal) return;
  unitModal.classList.add("hidden");
};

unitButtons.forEach((button) => {
  button.addEventListener("click", () => openUnitModal(button));
});

const applyUnitCategoryFilter = (category) => {
  let visibleCount = 0;
  unitButtons.forEach((button) => {
    const buttonCategory = button.getAttribute("data-category");
    const isVisible = buttonCategory === category;
    button.style.display = isVisible ? "" : "none";
    if (isVisible) visibleCount += 1;
  });

  if (unitEmpty) {
    unitEmpty.style.display = visibleCount === 0 ? "block" : "none";
  }
};

unitCategoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    unitCategoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const category = button.getAttribute("data-category");
    if (category) applyUnitCategoryFilter(category);
  });
});

if (unitCategoryButtons.length > 0) {
  const active = document.querySelector(".unit-category.active");
  const initialCategory = active ? active.getAttribute("data-category") : null;
  if (initialCategory) applyUnitCategoryFilter(initialCategory);
}

if (unitModalClose) {
  unitModalClose.addEventListener("click", closeUnitModal);
}

if (unitModal) {
  unitModal.addEventListener("click", (e) => {
    if (e.target === unitModal) {
      closeUnitModal();
    }
  });
}
