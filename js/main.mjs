import { addIngredient, getIngredients, renderIngredients, clearIngredients } from "./ingredientManager.mjs";
import { searchRecipes, getRecipeDetails, getRandomRecipe } from "./apiService.mjs";
import { renderRecipes } from "./recipeList.mjs";
import { renderRecipeDetails } from "./recipeDetails.mjs";
import { getFavorites, getPantry, saveToPantry } from "./storage.mjs";

let previousView = "home";
let allRecipes = [];
let currentPage = 1;
let wakeLock = null;
let isAwake = false;
let currentScale = 1;

const input = document.getElementById("ingredientInput");
const addBtn = document.getElementById("addBtn");
const ingredientList = document.getElementById("ingredientList");

const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const navSearch = document.getElementById("navSearch");

const cuisineFilter = document.getElementById("cuisineFilter");
const dietFilter = document.getElementById("dietFilter");
const timeFilter = document.getElementById("timeFilter");
const timeValue = document.getElementById("timeValue");

const activeFilters = document.getElementById("activeFilters");

const homeView = document.getElementById("homeView");
const resultsView = document.getElementById("resultsView");
const detailsView = document.getElementById("detailsView");
const favoritesView = document.getElementById("favoritesView");

const resultsContainer = document.getElementById("recipeResults");
const resultsTitle = document.getElementById("resultsTitle");
const returnHomeBtns = document.querySelectorAll(".returnHomeBtn");

const favoritesList = document.getElementById("favoritesList");

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navLinksList = document.querySelectorAll(".nav-links a");

const quickList = document.getElementById("quickList");

const savePantryBtn = document.getElementById("savePantryBtn");
const pantryView = document.getElementById("pantryView");
const pantryList = document.getElementById("pantryList");
const pantrySidebar = document.getElementById("pantrySidebar");

const prevBtn = document.getElementById("prevPageBtn");
const nextBtn = document.getElementById("nextPageBtn");

const randomBtn = document.getElementById("randomBtn");
const navRandomBtn = document.getElementById("navRandomBtn");

renderIngredients(ingredientList);
updateButtons();

function updateButtons() {
  const hasItems = getIngredients().length > 0;
  searchBtn.disabled = !hasItems;

  if (randomBtn) {
    randomBtn.classList.remove("disabled");
  }
}

// slider display
timeFilter.addEventListener("input", () => {
  timeValue.textContent = timeFilter.value;
});

// ADD INGREDIENT
addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  addIngredient(value);
  renderIngredients(ingredientList);
  renderQuickList();
  updateButtons();
  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// SEARCH
searchBtn.addEventListener("click", async () => {
  const ingredients = getIngredients();
  if (ingredients.length === 0) return;

  homeView.style.display = "none";
  pantrySidebar.style.display = "none";
  resultsView.style.display = "block";
  detailsView.style.display = "none";
  favoritesView.style.display = "none";
  

  resultsTitle.textContent =
    "Results for: " +
    ingredients.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(", ");

  activeFilters.innerHTML = "";

  if (cuisineFilter.value) {
    addFilterTag(cuisineFilter.value, "cuisine");
  }

  if (dietFilter.value) {
    addFilterTag(dietFilter.value, "diet");
  }

  if (timeFilter.value && timeFilter.value !== "60") {
    addFilterTag(`Under ${timeFilter.value} min`, "time");
  }

  resultsContainer.innerHTML = "<p>Loading...</p>";

  const recipes = await searchRecipes(
    ingredients,
    cuisineFilter.value,
    dietFilter.value,
    timeFilter.value
  );

  allRecipes = recipes;
  currentPage = 1;
  renderPaginatedRecipes();
});

// Paginatation
function renderPaginatedRecipes() {
  if (!allRecipes.length) {
    resultsContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  const perPage = 9;
  const totalPages = Math.ceil(allRecipes.length / perPage);

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  const pageData = allRecipes.slice(start, end);
  renderRecipes(pageData);

  const indicator = document.getElementById("pageIndicator");
  if (indicator) {
    indicator.textContent = `${currentPage} / ${totalPages}`;
  }
}

// VIEW DETAILS FROM RESULTS
resultsContainer.addEventListener("click", async (e) => {
  const button = e.target.closest(".view-btn");
  if (!button) return;

  const card = button.closest(".recipe-card");
  const id = card.dataset.id;

  previousView = "results";
  document.getElementById("backToResultsBtn").textContent = "Return to Results";

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

// BACK TO HOME
returnHomeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    resultsView.style.display = "none";
    detailsView.style.display = "none";
    favoritesView.style.display = "none";
    homeView.style.display = "block";
  pantrySidebar.style.display = "block";
    
  });
});

// BACK BUTTON
document.addEventListener("click", (e) => {
  if (e.target.id === "backToResultsBtn") {
    detailsView.style.display = "none";

    const btn = document.getElementById("backToResultsBtn");

    if (previousView === "favorites") {
      favoritesView.style.display = "block";
      resultsView.style.display = "none";
      btn.textContent = "Return to Favorites";
    } else {
      resultsView.style.display = "block";
      favoritesView.style.display = "none";
      btn.textContent = "Return to Results";
    }
  }
});

// NAV
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinksList[0].addEventListener("click", () => {
  homeView.style.display = "block";
  resultsView.style.display = "none";
  detailsView.style.display = "none";
  favoritesView.style.display = "none";
  pantrySidebar.style.display = "block";
});

navLinksList[1].addEventListener("click", () => {
  homeView.style.display = "none";
  pantrySidebar.style.display = "none";
  resultsView.style.display = "none";
  detailsView.style.display = "none";
  favoritesView.style.display = "block";
  
  renderFavorites();
});

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPaginatedRecipes();
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(allRecipes.length / 9)) {
      currentPage++;
      renderPaginatedRecipes();
    }
  });
}

// QUICK ADD
export const commonIngredients = [
  { name: "Eggs", emoji: "🥚" },
  { name: "Chicken", emoji: "🍗" },
  { name: "Rice", emoji: "🍚" },
  { name: "Garlic", emoji: "🧄" },
  { name: "Onion", emoji: "🧅" },
  { name: "Milk", emoji: "🥛" },
  { name: "Cheese", emoji: "🧀" },
  { name: "Butter", emoji: "🧈" },
  { name: "Tomato", emoji: "🍅" },
  { name: "Potato", emoji: "🥔" }
];

function renderQuickList() {
  if (!quickList) return;

  quickList.innerHTML = "";

  const currentIngredients = getIngredients();
  const pantryItems = getPantry();

  commonIngredients.forEach(item => {
    const btn = document.createElement("div");
    btn.className = "quick-item";

    btn.textContent = `${item.emoji} ${item.name}`;
    btn.dataset.value = item.name.toLowerCase();

    const isActive = currentIngredients.includes(btn.dataset.value);
    const isInPantry = pantryItems.includes(btn.dataset.value);

    if (isActive || isInPantry) {
      btn.classList.add("active");
    }

    if (isInPantry) {
      btn.classList.add("disabled");
    }

    btn.addEventListener("click", () => {
      const updatedIngredients = getIngredients();

      if (
        updatedIngredients.includes(btn.dataset.value) ||
        pantryItems.includes(btn.dataset.value)
      ) return;

      addIngredient(btn.dataset.value);
      renderIngredients(ingredientList);
      renderQuickList();
      updateButtons();
    });

    quickList.appendChild(btn);
  });
}

renderQuickList();

// CLEAR ALL
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    clearIngredients();
    renderIngredients(ingredientList);
    renderQuickList();
    updateButtons();
  });
}
// FAVORITES
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
      document.getElementById("backToResultsBtn").textContent = "Return to Favorites";

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

// Save to Pantry
savePantryBtn.addEventListener("click", () => {
  const ingredients = getIngredients();
  if (ingredients.length === 0) return;

  saveToPantry(ingredients);

  renderPantry();
  syncPantryToIngredients(); 

  savePantryBtn.textContent = "Saved!";
  setTimeout(() => {
    savePantryBtn.textContent = "Save to Pantry";
  }, 1200);
});

function renderPantry() {
  const pantry = getPantry();

  pantryList.innerHTML = "";

  if (pantry.length === 0) {
    pantryList.innerHTML = "<p>No pantry items yet.</p>";
    return;
  }

  pantry.forEach(item => {
    const tag = document.createElement("span");
    tag.className = "tag";

    tag.innerHTML = `
      <span class="text">${item.charAt(0).toUpperCase() + item.slice(1)}</span>
      <span class="remove">×</span>
    `;

    tag.addEventListener("click", () => {
      addIngredient(item);
      renderIngredients(ingredientList);
      renderQuickList();
    });

    tag.querySelector(".remove").addEventListener("click", (e) => {
      e.stopPropagation();

      const updated = pantry.filter(i => i !== item);
      localStorage.setItem("pantry", JSON.stringify(updated));

      renderPantry();
    });

    pantryList.appendChild(tag);
  });
}

renderPantry();
syncPantryToIngredients();
updateButtons();

// FILTER TAGS
function addFilterTag(text, type) {
  const tag = document.createElement("span");
  tag.className = "filter-tag";
  tag.textContent = text.charAt(0).toUpperCase() + text.slice(1);

  tag.addEventListener("click", () => {
    if (type === "cuisine") cuisineFilter.value = "";
    if (type === "diet") dietFilter.value = "";
    if (type === "time") {
      timeFilter.value = "60";
      timeValue.textContent = "60";
    }

    searchBtn.click();
  });

  activeFilters.appendChild(tag);
}

// Random
async function handleRandomRecipes() {
  homeView.style.display = "none";
  resultsView.style.display = "block";
  detailsView.style.display = "none";
  favoritesView.style.display = "none";
  pantrySidebar.style.display = "none";

  resultsTitle.textContent = "Random Recipes";

  activeFilters.innerHTML = "";
  resultsContainer.innerHTML = "<p>Loading...</p>";

  const data = await getRandomRecipe();

  if (!Array.isArray(data) || data.length === 0) {
    resultsContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  allRecipes = [];

  data.forEach(recipe => {
    allRecipes.push({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      missedIngredientCount: 0,
      usedIngredientCount: 0
    });
  });

  currentPage = 1;
  renderPaginatedRecipes();
}

if (randomBtn) {
  randomBtn.addEventListener("click", handleRandomRecipes);
}

if (navRandomBtn) {
  navRandomBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleRandomRecipes();
  });
}

// Stay Awake Logic
async function toggleWakeLock() {
  try {
    if (!isAwake) {
      wakeLock = await navigator.wakeLock.request("screen");
      isAwake = true;

      wakeLock.addEventListener("release", () => {
        isAwake = false;
        updateWakeUI();
      });
    } else {
      await wakeLock.release();
      wakeLock = null;
      isAwake = false;
    }

    updateWakeUI();
  } catch (err) {
    console.error("Wake Lock error:", err);
  }
}

function updateWakeUI() {
  const toggle = document.getElementById("wakeToggle");
  if (!toggle) return;

  if (isAwake) {
    toggle.classList.add("active");
  } else {
    toggle.classList.remove("active");
  }
}

document.addEventListener("click", (e) => {
  const toggle = e.target.closest("#wakeToggle");
  if (!toggle) return;

  toggleWakeLock();
});

// Recipe Scale Logic

document.addEventListener("click", (e) => {
  if (e.target.closest("#scaleControl button")) {
    const btn = e.target.closest("#scaleControl button");
    currentScale = parseFloat(btn.dataset.scale);

    document.querySelectorAll("#scaleControl button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    applyScaling();
  }
});

function applyScaling() {
  const items = document.querySelectorAll("#detailIngredients li");

  items.forEach(item => {
    if (!item.dataset.original) {
      item.dataset.original = item.textContent;
    }

    const text = item.dataset.original;

    const updated = text.replace(/(\d+(\.\d+)?)/g, (num) => {
      return (parseFloat(num) * currentScale)
        .toFixed(2)
        .replace(/\.00$/, "");
    });

    item.textContent = updated;
  });
}

function syncPantryToIngredients() {
  const pantryItems = getPantry();
  const currentIngredients = getIngredients();

  pantryItems.forEach(item => {
    if (!currentIngredients.includes(item)) {
      addIngredient(item);
    }
  });

  renderIngredients(ingredientList);
  renderQuickList();
  updateButtons();
}