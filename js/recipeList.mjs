export function renderRecipes(recipes) {
  const container = document.getElementById("recipeResults");
  container.innerHTML = "";

  recipes.slice(0, 9).forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.dataset.id = recipe.id;

    const missing = recipe.missedIngredients.map(i => i.name).join(", ");

    const total = recipe.usedIngredientCount + recipe.missedIngredientCount;

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <p>
        Match: ${recipe.usedIngredientCount}/${total}<br>
        Missing: ${missing || "None"}
      </p>
      <button class="view-btn">View Recipe</button>
    `;

    container.appendChild(card);
  });
}