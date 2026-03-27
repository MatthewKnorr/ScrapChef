import { addIngredient, getIngredients, renderIngredients } from "./ingredientManager.mjs";
import { searchRecipes } from "./apiService.mjs";
import { renderRecipes } from "./recipeList.mjs";

const input = document.getElementById("ingredientInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("ingredientList");
const searchBtn = document.getElementById("searchBtn");

const homeView = document.getElementById("homeView");
const resultsView = document.getElementById("resultsView");

const resultsContainer = document.getElementById("recipeResults");
const resultsTitle = document.getElementById("resultsTitle");
const newSearchBtn = document.getElementById("newSearchBtn");

// Add ingredient
addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  addIngredient(value);
  renderIngredients(list);
  input.value = "";
});

// Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Search recipes
searchBtn.addEventListener("click", async () => {
  const ingredients = getIngredients();

  // prevent empty search
  if (ingredients.length === 0) {
    alert("Add ingredients first");
    return;
  }

  homeView.style.display = "none";
  resultsView.style.display = "block";

  // Capitalized results title
  resultsTitle.textContent =
    "Results for: " +
    ingredients
      .map(i => i.charAt(0).toUpperCase() + i.slice(1))
      .join(", ");

  resultsContainer.innerHTML = "<p>Loading recipes...</p>";

  try {
    const recipes = await searchRecipes(ingredients);

    if (!recipes || recipes.length === 0) {
      resultsContainer.innerHTML = "<p>No recipes found</p>";
      return;
    }

    recipes.sort((a, b) => b.usedIngredientCount - a.usedIngredientCount);

    renderRecipes(recipes);

  } catch {
    resultsContainer.innerHTML = "<p>Error loading recipes</p>";
  }
});

// New Search
newSearchBtn.addEventListener("click", () => {
  resultsView.style.display = "none";
  homeView.style.display = "block";
});

// Hamburger
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("open");
});