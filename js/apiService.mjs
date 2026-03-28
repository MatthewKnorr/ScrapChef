const API_KEY = "YOUR_API_KEY_HERE";

export async function searchRecipes(ingredients) {
  try {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(",")}&number=9&apiKey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !Array.isArray(data)) {
      console.error("API FAILED:", data);
      return [];
    }

    return data;
  } catch (err) {
    console.error("FETCH FAILED:", err);
    return [];
  }
}

export async function getRecipeDetails(id) {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("DETAIL ERROR:", data);
      return null;
    }

    return data;
  } catch (err) {
    console.error("DETAIL FETCH FAILED:", err);
    return null;
  }
}