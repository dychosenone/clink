const { Mongoose } = require('mongoose');
const { path } = require('../app');
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
        const details = req.body;
        const filename = req.file.filename;

        const data = {
            name : req.body.name,
            image : './uploads/' + filename,
            prepTime: req.body.prepTime,
            ingredients: req.body.ingredients,
            steps: req.body.steps,
            reviews: [],
            author: req.session.userId
        }

        const result = await recipeServices.addRecipe(data);
        res.status(200).json(result);
    }
}

module.exports = recipes;