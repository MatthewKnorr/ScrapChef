export function renderRecipes(recipes) {
  const container = document.getElementById("recipeResults");
  container.innerHTML = "";

  if (!Array.isArray(recipes) || recipes.length === 0) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.slice(0, 9).forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.dataset.id = recipe.id;

    const missing = recipe.missedIngredients?.map(i => i.name).join(", ") || "None";
    const total = (recipe.usedIngredientCount || 0) + (recipe.missedIngredientCount || 0);

    card.innerHTML = `
      <img src="${recipe.image}" onerror="this.src='https://via.placeholder.com/300x200'" />
      <h3>${recipe.title}</h3>
      <p>
        Match: ${recipe.usedIngredientCount || 0}/${total}<br>
        Missing: ${missing}
      </p>
      <button class="view-btn">View Recipe</button>
    `;

    container.appendChild(card);
  });
}