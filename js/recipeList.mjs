export function renderRecipes(recipes) {
  const container = document.getElementById("recipeResults");
  container.innerHTML = "";

  if (!recipes.length) {
    container.innerHTML = "<p>No recipes found</p>";
    return;
  }

  recipes.slice(0, 9).forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    const missing = recipe.missedIngredients
      .map(i => i.name)
      .join(", ");

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <p>
        ✅ ${recipe.usedIngredientCount} used<br>
        ❌ Missing: ${missing || "None"}
      </p>
    `;

    container.appendChild(card);
  });
}