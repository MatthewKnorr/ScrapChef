import { saveFavorite, getFavorites } from "./storage.mjs";

export function renderRecipeDetails(recipe) {
  document.getElementById("detailTitle").textContent = recipe.title;
  document.getElementById("detailImage").src = recipe.image;

  const ingredientsList = document.getElementById("detailIngredients");
  ingredientsList.innerHTML = "";

  recipe.extendedIngredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.original;
    ingredientsList.appendChild(li);
  });

  document.getElementById("detailInstructions").innerHTML =
    recipe.instructions || "No instructions available.";

  const saveBtn = document.getElementById("saveBtn");

  const favorites = getFavorites();
  const isSaved = favorites.some(r => r.id === recipe.id);

  if (isSaved) {
    saveBtn.textContent = "Saved ✓";
    saveBtn.disabled = true;
  } else {
    saveBtn.textContent = "Save to Favorites";
    saveBtn.disabled = false;

    saveBtn.onclick = () => {
      saveFavorite(recipe);
      saveBtn.textContent = "Saved ✓";
      saveBtn.disabled = true;
    };
  }
}