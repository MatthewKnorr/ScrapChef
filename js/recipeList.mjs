const PLACEHOLDER = "https://placehold.co/300x200/A5D6A7/333333?text=No+Image+Available";

export function renderRecipes(recipes) {
    const container = document.getElementById("recipeResults");
    container.innerHTML = "";

    if (!recipes || recipes.length === 0) {
        container.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.dataset.id = recipe.id;

        // IMAGE
        const img = document.createElement("img");
        img.src = recipe.image || PLACEHOLDER;

        img.onerror = () => {
            img.src = PLACEHOLDER;
        };

        // TITLE
        const title = document.createElement("h3");
        title.textContent = recipe.title || "Untitled Recipe";

        const used = recipe.usedIngredientCount || 0;
        const missed = recipe.missedIngredientCount || 0;
        const total = used + missed;

        const percent = total ? Math.round((used / total) * 100) : 0;

        function getBadge(percent) {
            if (percent >= 80) return "🟢";
            if (percent >= 50) return "🟡";
            return "🔴";
        }

        const badge = getBadge(percent);

        const missingText = (recipe.missedIngredients || [])
            .slice(0, 2)
            .map(i => i.name)
            .join(", ");

        const info = document.createElement("div");
        info.className = "recipe-meta";

        info.innerHTML = `
    <p class="recipe-score">
        ${badge} ${percent}% match (${used}/${total})
    </p>
    <p class="missing">Missing: ${missingText || "None"}</p>
`;

        // BUTTON
        const btn = document.createElement("button");
        btn.textContent = "View Recipe";
        btn.className = "view-btn";

        // BUILD CARD
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(info);
        card.appendChild(btn);

        container.appendChild(card);
    });
}