// Database Models
const { Mongoose } = require('mongoose');
const { path } = require('../app');
const db = require('../models/db');

// Database Models nad Services
const Recipes = require('../models/schemas/Users');
const recipeServices = require('../service/recipe');

// Recipe related Functions
var recipes = { 

    // Gets all the recipes in the database
    getRecipes : async (req, res) => {
        const recipes = await recipeServices.getRecipes({});
        res.status(200).json(recipes);
    },

    // Gets a specified recipe using the recipe ID
    getRecipe : async (req, res) => {
        const recipeId = req.params.id;
        const recipe = await recipeServices.getRecipe({_id: recipeId});
        res.status(200).json(recipe);
    },

    // Uploads a new recipe to the database
    postRecipe : async (req, res) => {
        const details = req.body;
        const filename = req.file.filename;

        const data = {
            name : req.body.name,
            image : filename,
            prepTime: req.body.prepTime,
            ingredients: req.body.ingredients,
            steps: req.body.steps,
            reviews: [],
            author: req.user._id
        }

        const result = await recipeServices.addRecipe(data);
        res.status(200).json(result);
    },

    // Deletes a recipe from the database
    deleteRecipe : async (req, res) => {
        const recipeId = req.params.id;
        
        const result = recipeServices.deleteRecipe({_id : recipeId});

        res.status(200).json(result);

    },
    
    // Updates a recipe in the database
    updateRecipe : async (req, res) => {

        const data = {
            name : req.body.name,
            prepTime: req.body.prepTime,
            ingredients: req.body.ingredients,
            steps: req.body.steps,
            _id: req.body._id
        }

        const result = recipeServices.updateRecipe(data);

        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Recipe not found!'});
        }
    }, 

    // Updates the uploaded image in the database
    updateImage : async (req, res) => {
        const filename = req.file.filename;

        const data = {
            image: filename,
            _id: req.body._id 
        }

        console.log(data.image);

        const result = recipeServices.updateImage(data);

        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Recipe not found!'});
        }
    }, 
    
    // Searches for a recipe with a specific name in the database
    searchRecipe : async (req, res) => {
        const searchQuery = req.params.searchQuery;

        const result = await recipeServices.getRecipes({name: {$regex : searchQuery, $options: "i"}});

        res.status(200).json(result);
    },

    // Gets the review of a specific Recipe
    getReview : async(req, res) => {
        const recipeId = req.params.recipeId;
        const result = await recipeServices.getRecipe({_id: recipeId});

        res.status(200).json(result.reviews);
    },

    // Adds a review to a recipe in the database
    addReview : async (req, res) => {
        const recipeId = req.body.recipeId;
        const reviewBody = req.body.body;

        console.log(recipeId);
        console.log(reviewBody);
        console.log(req.body.userId);

        const result = await recipeServices.addReview(recipeId, reviewBody, req.body.userId);

        if(result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ message: 'Recipe not found!'});
        }
    }, 

    // Deletes a review given a review and recipe id
    deleteReview : async (req, res) => {
        const reviewId = req.params.reviewId;
        const recipeId = req.params.recipeId;
        const userId = req.user._id;


        const result = await recipeServices.deleteReview(recipeId, reviewId);

        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Review not found!" });
        }

        
    }, 
    
    // Updates the body of the review
    editReview : async (req, res) => {

        const recipeId = req.body.recipeId; 
        const reviewId = req.body._id;
        const reviewBody = req.body.body; 

        console.log(req.body);

        const result = await recipeServices.editReview(recipeId, reviewBody, reviewId, req.body._id); 

        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Review not found!" });
        }
    },

    getImage : async(req, res) => {
        const fileName = req.params.filename;
        res.sendfile(`./uploads/${fileName}`);
    }

}

// Export Function
module.exports = recipes;