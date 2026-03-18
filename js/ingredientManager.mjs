let ingredients = [];

export function addIngredient(item) {
  if (!item) return;
  ingredients.push(item.toLowerCase());
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
      ${ingredient}
      <span class="remove">×</span>
    `;

    tag.addEventListener("click", () => {
      removeIngredient(index);
      renderIngredients(container);
    });

    container.appendChild(tag);
  });
}