const Recipes = require('../models/schemas/Recipes.js');

const recipeService = {

    getRecipes : async (data) => Recipes.find(data),
    getRecipe: async (data) => Recipes.findOne(data)

};

module.exports = recipeService;
