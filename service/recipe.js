const Recipes = require('../models/schemas/Recipes.js');

const recipeService = {

    getRecipes : async (data) => Recipes.find(data),

    getRecipe : async (data) => Recipes.findOne(data),

    addRecipe : async (recipe) => {
        const newRecipe = new Recipes({
            name : recipe.name,
            image : recipe.image,
            prepTime: recipe.prepTime,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            reviews: [],
            author: recipe.author,
        }); 

        return newRecipe.save();
    }

};

module.exports = recipeService;
