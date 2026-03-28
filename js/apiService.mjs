const API_KEY = "263df75b323c4496a78c6ce5be673655";

export async function searchRecipes(ingredients) {
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(",")}&number=9&apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export async function getRecipeDetails(id) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );

  const data = await res.json();
  return data;
}