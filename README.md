# Scrap Chef

Scrap Chef is a web application that helps users discover meals they can cook using ingredients they already have. Instead of wasting food or guessing what to make, users can enter ingredients, apply filters, and receive relevant recipe suggestions instantly.

## Live Demo

[View Live Site](https://matthewknorr.github.io/ScrapChef/index.html#)

## Features

- Enter ingredients you already have  
- Pantry-based search for quick recipe discovery  
- Get recipe suggestions using the Spoonacular API  
- Shows ingredient match vs. missing ingredients per recipe  
- Filter results by cuisine, diet, and cooking time  
- Interactive filter tags (click to remove and update results instantly)  
- Pagination for browsing more recipes  
- View recipe details (ingredients, instructions, time, servings)  
- Save favorite recipes using localStorage  
- API response caching for faster performance  
- Quick-add ingredient buttons for faster input  
- Random recipe generator  
- Multi-view navigation (Home, Results, Details, Favorites)  
- Responsive design for mobile and desktop  

## Purpose

Many people struggle to decide what to cook or waste food due to unused ingredients. Scrap Chef helps turn available ingredients into real meal ideas while reducing food waste and simplifying meal planning.

## Audience

- College students  
- Busy individuals  
- Anyone cooking at home  
- People looking to reduce food waste  

## Tech Stack

- JavaScript (ES Modules)  
- HTML / CSS  
- Spoonacular API  
- localStorage  

## Project Structure

- `main.mjs` – App initialization and view management  
- `ingredientManager.mjs` – Ingredient input handling  
- `apiService.mjs` – API communication, caching, and data handling  
- `recipeList.mjs` – Displays recipe results and pagination  
- `recipeDetails.mjs` – Shows full recipe information  
- `storage.mjs` – Handles saved favorites and local data  

## How It Works

1. User enters ingredients or uses quick-add suggestions  
2. Pantry is built and optional filters are applied (cuisine, diet, time)  
3. App requests recipes from Spoonacular API (with caching)  
4. Recipes are displayed with ingredient match and missing data  
5. User can browse pages, view details, or save favorites  

## Development Timeline

- Week 1: Setup and API connection  
- Week 2: Recipe search and results  
- Week 3: Recipe details and favorites  
- Week 4: Filtering, pagination, and final improvements  

## Future Improvements

- Nutrition tracking  
- Ingredient substitutions  
- Improved filtering accuracy  
- User accounts and cloud save  
- Smarter recipe ranking based on pantry match  