let ingredients = [];

export function addIngredient(item) {
  const sanitized = item
    .replace(/[^a-zA-Z\s]/g, "") 
    .toLowerCase()
    .trim();

  if (!sanitized) return; 

  if (!ingredients.includes(sanitized)) {
    ingredients.push(sanitized);
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }
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

  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  ingredients.forEach((ingredient, index) => {
    const tag = document.createElement("span");
    tag.className = "tag";

    tag.innerHTML = `
      <span class="text">${ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</span>
      <span class="remove">×</span>
    `;

    if (isMobile) {
      tag.addEventListener("click", () => {
        removeIngredient(index);
        renderIngredients(container);
      });
    } else {
      tag.querySelector(".remove").addEventListener("click", (e) => {
        e.stopPropagation();
        removeIngredient(index);
        renderIngredients(container);
      });
    }

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
    const value = item.dataset.value; 

    if (getIngredients().includes(value)) {
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