import { addIngredient, getIngredients, renderIngredients } from "./ingredientManager.mjs";
import { searchRecipes } from "./apiService.mjs";
import { renderRecipes } from "./recipeList.mjs";

const input = document.getElementById("ingredientInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("ingredientList");
const searchBtn = document.getElementById("searchBtn");
const debug = document.getElementById("debug");

// Add ingredient 
addBtn.addEventListener("click", () => {
  const value = input.value.trim();

  if (!value) return; 

  addIngredient(value);
  renderIngredients(list);

  input.value = "";
});
console.log(getIngredients());

// Recipe Search Handler
searchBtn.addEventListener("click", async () => {
  const ingredients = getIngredients();
  console.log("INGREDIENTS:", ingredients);

  const recipes = await searchRecipes(ingredients);
  console.log("RECIPES:", recipes);

  if (!recipes || recipes.length === 0) {
    document.getElementById("recipeResults").innerHTML = "No recipes found";
    return;
  }

  renderRecipes(recipes);
});

// Hamburger
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("open");
});