const API_KEY = "e369f21e024f4c918b69349bebebe766";
// const API_KEY_BACKUP_A = "f3320e0ed6804ed6956f2f84f4312757";
// const API_KEY_BACKUP_B = "7471700167fd4f25ac57bae55ea133ee";
const CACHE_DURATION = 1000 * 60 * 60; 

export async function searchRecipes(ingredients) {
  const key = ingredients.slice().sort().join(",");
  const cacheKey = "recipes_" + key;

  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const parsed = JSON.parse(cached);

    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed.data;
    } else {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(",")}&number=9&apiKey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      if (res.status === 402) return { error: "limit" };
      return { error: "general" };
    }

    if (!Array.isArray(data)) {
      return { error: "general" };
    }

    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data,
        timestamp: Date.now()
      })
    );

    return data;

  } catch {
    return { error: "network" };
  }
}

export async function getRecipeDetails(id) {
  const cacheKey = "recipe_" + id;

  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const parsed = JSON.parse(cached);

    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed.data;
    } else {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 402) return { error: "limit" };
      return null;
    }

    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data,
        timestamp: Date.now()
      })
    );

    return data;

  } catch {
    return null;
  }
}