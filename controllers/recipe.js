const { Mongoose } = require('mongoose');
const db = require('../models/db');

const Recipes = require('../models/schemas/Users');
const recipeServices = require('../service/recipe');

var recipes = { 

    getRecipes : async (req, res) => {
        const recipes = await recipeServices.getRecipes({});
        res.status(200).json(recipes);
    },

    getRecipe : async (req, res) => {
        const recipeId = req.body.id;
        const recipe = await recipeServices.getRecipe({_id: recipeId});

        res.status(200).json(recipe);
    },

    postRecipe : async (req, res) => {
        
    }
}

module.exports = recipes;