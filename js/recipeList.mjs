export function renderRecipes(recipes) {
  const container = document.getElementById("recipeResults");
  container.innerHTML = "";

  recipes.slice(0, 9).forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    const missing = recipe.missedIngredients
      .map(i => i.name)
      .join(", ");

    card.innerHTML = `
      <img src="${recipe.image}" />
      <h3>${recipe.title}</h3>
      <p>
        ${recipe.usedIngredientCount} ingredient(s) used<br>
        Missing: ${missing || "None"}
      </p>
    `;

    container.appendChild(card);
  });
}