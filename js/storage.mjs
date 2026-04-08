const KEY = "favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveFavorite(recipe) {
  const favorites = getFavorites();

  if (favorites.some(r => r.id === recipe.id)) return;

  favorites.push({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image
  });

  localStorage.setItem(KEY, JSON.stringify(favorites));
}

export function getPantry() {
  const stored = localStorage.getItem("pantry");
  return stored ? JSON.parse(stored) : [];
}

export function saveToPantry(items) {
  const pantry = getPantry();

  const merged = [...new Set([...pantry, ...items])];

  localStorage.setItem("pantry", JSON.stringify(merged));
}