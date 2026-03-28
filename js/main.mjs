import { addIngredient, getIngredients, renderIngredients } from "./ingredientManager.mjs";
import { searchRecipes, getRecipeDetails } from "./apiService.mjs";
import { renderRecipes } from "./recipeList.mjs";
import { renderRecipeDetails } from "./recipeDetails.mjs";
import { getFavorites } from "./storage.mjs";

let previousView = "home";

const input = document.getElementById("ingredientInput");
const addBtn = document.getElementById("addBtn");
const ingredientList = document.getElementById("ingredientList");

const searchBtn = document.getElementById("searchBtn");

const homeView = document.getElementById("homeView");
const resultsView = document.getElementById("resultsView");
const detailsView = document.getElementById("detailsView");
const favoritesView = document.getElementById("favoritesView");

const resultsContainer = document.getElementById("recipeResults");
const resultsTitle = document.getElementById("resultsTitle");
const newSearchBtn = document.getElementById("newSearchBtn");

const favoritesList = document.getElementById("favoritesList");

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navLinksList = document.querySelectorAll(".nav-links a");

const quickList = document.getElementById("quickList");

renderIngredients(ingredientList);

/* ADD */
addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  addIngredient(value);
  renderIngredients(ingredientList);
  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

/* SEARCH */
searchBtn.addEventListener("click", async () => {
  const ingredients = getIngredients();
  if (ingredients.length === 0) return;

  homeView.style.display = "none";
  resultsView.style.display = "block";
  detailsView.style.display = "none";
  favoritesView.style.display = "none";

  resultsTitle.textContent =
    "Results for: " +
    ingredients.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(", ");

  resultsContainer.innerHTML = "<p>Loading...</p>";

  const recipes = await searchRecipes(ingredients);
  renderRecipes(recipes);
});

/* VIEW DETAILS FROM RESULTS */
resultsContainer.addEventListener("click", async (e) => {
  const button = e.target.closest(".view-btn");
  if (!button) return;

  const card = button.closest(".recipe-card");
  const id = card.dataset.id;

  previousView = "results";

  resultsView.style.display = "none";
  detailsView.style.display = "block";

  const recipe = await getRecipeDetails(id);

  if (!recipe) {
    alert("Error loading recipe. Returning to results.");

    detailsView.style.display = "none";
    resultsView.style.display = "block";
    return;
  }

  renderRecipeDetails(recipe);
});

/* BACK TO HOME */
newSearchBtn.addEventListener("click", () => {
  resultsView.style.display = "none";
  detailsView.style.display = "none";
  favoritesView.style.display = "none";
  homeView.style.display = "block";
});

/* BACK BUTTON */
document.addEventListener("click", (e) => {
  if (e.target.id === "backToResultsBtn") {
    detailsView.style.display = "none";

    if (previousView === "favorites") {
      favoritesView.style.display = "block";
      resultsView.style.display = "none";
    } else {
      resultsView.style.display = "block";
      favoritesView.style.display = "none";
    }
  }
});

/* NAV */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinksList[0].addEventListener("click", () => {
  homeView.style.display = "block";
  resultsView.style.display = "none";
  detailsView.style.display = "none";
  favoritesView.style.display = "none";
});

navLinksList[1].addEventListener("click", () => {
  homeView.style.display = "none";
  resultsView.style.display = "none";
  detailsView.style.display = "none";
  favoritesView.style.display = "block";

  renderFavorites();
});

/* QUICK ADD */
const commonIngredients = [
  "Eggs","Chicken","Rice","Garlic","Onion","Milk","Cheese","Butter","Tomato","Potato"
];

if (quickList) {
  commonIngredients.forEach(item => {
    const btn = document.createElement("div");
    btn.className = "quick-item";
    btn.textContent = item;

    btn.addEventListener("click", () => {
      addIngredient(item);
      renderIngredients(ingredientList);
    });

    quickList.appendChild(btn);
  });
}

/* FAVORITES */
function renderFavorites() {
  const favorites = getFavorites();
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  favorites.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.dataset.id = recipe.id;

    card.innerHTML = `
      <img src="${recipe.image}" onerror="this.src='https://via.placeholder.com/300x200'" />
      <h3>${recipe.title}</h3>
      <button class="view-btn">View Recipe</button>
      <button class="remove-btn">Remove</button>
    `;

    card.querySelector(".view-btn").addEventListener("click", async (e) => {
      e.stopPropagation();

      previousView = "favorites";

      favoritesView.style.display = "none";
      detailsView.style.display = "block";

      const recipeData = await getRecipeDetails(recipe.id);

      if (!recipeData) {
        alert("Error loading recipe. Returning to favorites.");

        detailsView.style.display = "none";
        favoritesView.style.display = "block";
        return;
      }

      renderRecipeDetails(recipeData);
    });

    card.querySelector(".remove-btn").addEventListener("click", (e) => {
      e.stopPropagation();

      const updated = favorites.filter(r => r.id !== recipe.id);
      localStorage.setItem("favorites", JSON.stringify(updated));

      renderFavorites();
    });

    favoritesList.appendChild(card);
  });
}