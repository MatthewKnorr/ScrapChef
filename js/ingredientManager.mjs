let ingredients = [];

export function addIngredient(item) {
  ingredients.push(item);
}

export function getIngredients() {
  return ingredients;
}

export function renderIngredients(container) {
  container.innerHTML = "";

  ingredients.forEach(i => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = i;

    container.appendChild(tag);
  });
}