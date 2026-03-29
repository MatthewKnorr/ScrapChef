let ingredients = [];

export function addIngredient(item) {
  if (!item) return;

  const formatted = item.toLowerCase();

  if (ingredients.includes(formatted)) return;

  ingredients.push(formatted);

  updateQuickItems();
  updateButtons();
}

export function getIngredients() {
  return ingredients;
}

export function removeIngredient(index) {
  ingredients.splice(index, 1);

  updateQuickItems();
  updateButtons();
}

export function clearIngredients() {
  ingredients = [];

  updateQuickItems();
  updateButtons();
}

export function renderIngredients(container) {
  container.innerHTML = "";

  ingredients.forEach((ingredient, index) => {
    const tag = document.createElement("span");
    tag.className = "tag";

    tag.innerHTML = `
      <span class="text">${ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</span>
      <span class="remove">×</span>
    `;

    tag.querySelector(".remove").addEventListener("click", (e) => {
      e.stopPropagation();
      removeIngredient(index);
      renderIngredients(container);
    });

    container.appendChild(tag);
  });

  if (ingredients.length > 0) {
    const clearTag = document.createElement("span");
    clearTag.className = "tag clear-tag";
    clearTag.textContent = "Clear All";

    clearTag.addEventListener("click", () => {
      clearIngredients();
      renderIngredients(container);
    });

    container.appendChild(clearTag);
  }

  updateQuickItems();
  updateButtons();
}

function updateQuickItems() {
  const quickItems = document.querySelectorAll(".quick-item");

  quickItems.forEach(item => {
    const value = item.textContent.toLowerCase();

    if (ingredients.includes(value)) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function updateButtons() {
  const searchBtn = document.getElementById("searchBtn");

  const hasItems = ingredients.length > 0;

  if (searchBtn) searchBtn.disabled = !hasItems;
}