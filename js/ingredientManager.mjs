let ingredients = [];

export function addIngredient(item) {
  if (!item) return;

  const formatted = item.toLowerCase();

  if (ingredients.includes(formatted)) return;

  ingredients.push(formatted);
}

export function getIngredients() {
  return ingredients;
}

export function removeIngredient(index) {
  ingredients.splice(index, 1);
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
}