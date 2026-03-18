import { addIngredient, getIngredients, renderIngredients } from "./ingredientManager.mjs";
import { searchRecipes } from "./apiService.mjs";

const input = document.getElementById("ingredientInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("ingredientList");
const searchBtn = document.getElementById("searchBtn");
const debug = document.getElementById("debug");

/* Add ingredient */
addBtn.addEventListener("click", () => {
  const value = input.value.trim();

  if (!value) return; 

  addIngredient(value);
  renderIngredients(list);

  input.value = "";
});
console.log(getIngredients());

/* Test API */
searchBtn.addEventListener("click", async () => {
  const ingredients = getIngredients().join(",");

  if (!ingredients) return;

  const recipes = await searchRecipes(ingredients);

  debug.innerHTML = `<pre>${JSON.stringify(recipes, null, 2)}</pre>`;
});