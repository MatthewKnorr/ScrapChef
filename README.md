# Scrap Chef

Scrap Chef is a web application that helps users discover meals they can cook using ingredients they already have. Instead of wasting food or guessing what to make, users can enter ingredients, apply filters, and receive relevant recipe suggestions instantly.

## Live Demo

https://matthewknorr.github.io/ScrapChef/index.html#

## Features

- Enter ingredients you already have
- Get recipe suggestions using the Spoonacular API
- Filter results by cuisine, diet, and cooking time
- Interactive filter tags (click to remove and update results instantly)
- View recipe details (ingredients, instructions, time, servings)
- Save favorite recipes using localStorage
- Quick ingredient suggestions for faster input
- Random recipe generator

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

- main.mjs – App initialization and view management  
- ingredientManager.mjs – Ingredient input handling  
- apiService.mjs – API communication and data handling  
- recipeList.mjs – Displays recipe results  
- recipeDetails.mjs – Shows full recipe information  
- storage.mjs – Handles saved favorites  

## How It Works

1. User enters ingredients  
2. Optional filters are applied (cuisine, diet, time)  
3. App requests recipes from Spoonacular API  
4. Recipes are displayed and can be refined further  
5. User can view details or save favorites  

## Development Timeline

- Week 1: Setup and API connection  
- Week 2: Recipe search and results  
- Week 3: Recipe details and favorites  
- Week 4: Filtering, UI improvements, and final features  

## Future Improvements

- Nutrition tracking  
- Ingredient substitutions  
- Improved filtering accuracy  