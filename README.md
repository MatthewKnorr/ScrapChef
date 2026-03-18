# Pantry Pal

Pantry Pal is a web application that helps users discover meals they can cook using ingredients they already have. Instead of wasting food or guessing what to make, users can enter ingredients and receive recipe suggestions.

## Features

- Enter ingredients you already have
- Get recipe suggestions using the Spoonacular API
- View recipe details (ingredients, instructions, time, servings)
- Save favorite recipes using localStorage
- Quick ingredient suggestions
- Random recipe generator

## Purpose

Many people struggle to decide what to cook or waste food due to unused ingredients. Pantry Pal helps turn available ingredients into real meal ideas.

## Audience

- College students
- Busy individuals
- Anyone cooking at home
- People trying to reduce food waste

## Tech Stack

- JavaScript (ES Modules)
- HTML / CSS
- Spoonacular API
- localStorage

## Project Structure

- main.mjs – App initialization  
- ingredientManager.mjs – Ingredient input handling  
- apiService.mjs – API communication  
- recipeList.mjs – Displays recipes  
- recipeDetails.mjs – Shows full recipe info  
- storage.mjs – Handles saved data  

## How It Works

1. User enters ingredients  
2. App requests recipes from Spoonacular API  
3. Recipes are displayed  
4. User can view details or save favorites  

## Development Timeline

- Week 1: Setup and API connection  
- Week 2: Recipe search and results  
- Week 3: Recipe details and favorites  
- Week 4: Random feature and final improvements  

## Future Improvements

- Nutrition tracking  
- Ingredient substitutions  
- Advanced filters  
