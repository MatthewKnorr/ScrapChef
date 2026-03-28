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