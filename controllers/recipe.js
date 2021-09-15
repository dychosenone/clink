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
        const recipeId = req.params.id;
        const recipe = await recipeServices.getRecipe({_id: recipeId});
        res.status(200).json(recipe);
    },

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

    deleteRecipe : async (req, res) => {
        const recipeId = req.params.id;
        
        const result = recipeServices.deleteRecipe({_id : recipeId});

        res.status(200).json(result);

    },

    updateRecipe : async (req, res) => {
        //const details = req.body;
        //const filename = req.file.filename;

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

    searchRecipe : async (req, res) => {
        const searchQuery = req.params.searchQuery;

        const result = await recipeServices.getRecipes({name: {$regex : searchQuery, $options: "i"}});

        res.status(200).json(result);
    },

    getReview : async(req, res) => {
        const recipeId = req.params.recipeId;
        const result = await recipeServices.getRecipe({_id: recipeId});

        res.status(200).json(result.reviews);
    },

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

    editReview : async (req, res) => {

        const recipeId = req.body.recipeId; 
        const reviewId = req.body.reviewId;
        const reviewBody = req.body.review; 

        const result = await recipeServices.editReview(recipeId, reviewBody, reviewId, req.session.userId); 
    
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

module.exports = recipes;