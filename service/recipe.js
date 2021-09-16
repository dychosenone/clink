// Import database models
const Recipes = require('../models/schemas/Recipes.js');

const recipeService = {

    // Gets all recipes from the database
    getRecipes : async (data) => Recipes.find(data),

    // Gets a recipe from the database
    getRecipe : async (data) => Recipes.findOne(data), 

    // Adds a recipe to the database
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
    },

    // Deletes a recipe from the database
    deleteRecipe: async (data) => Recipes.deleteOne(data), 

    // Updates a recipe from the database
    updateRecipe: async (data) => {
            const recipe = await recipeService.getRecipe({ _id: data._id});

            if(data.name !== '') {
                recipe.name = data.name; 
            }
        
            if(data.prepTime !== '') {
                recipe.prepTime = data.prepTime; 
            }
        
            if(data.ingredients !== '') {
                recipe.ingredients = data.ingredients; 
            }

            if(data.steps !== '') {
                recipe.steps = data.steps; 
            }
            
            return recipe.save();
    }, 

    // Updates a recipe image from the database
    updateImage: async (data) => {

            const recipe = await recipeService.getRecipe({ _id: data._id});
            
            console.log(recipe);
            console.log("updateImage Services");
            console.log(recipe.image);
            console.log(data.image);
        
            if(data.image !== '') {
                const path = data.image;  
                recipe.image = path; 
            }
        
            
            return recipe.save();
    }, 

    // Adds a review to a recipe
    addReview : async (recipeId, reviewBody, userId) => {

        const recipes = await recipeService.getRecipe({_id : recipeId});

        const recipe = {_id : recipeId};

        const addReview = {
            $push : {reviews : {
                userId: userId,
                body: reviewBody
            }}
        };

        const result = await Recipes.updateOne(recipe, addReview);

        return recipes.save();


    }, 

    // Deletes an exisiting review
    deleteReview : async (recipeId, reviewId) => {
        try {
            const recipe = {_id : recipeId};
            console.log(recipe);

            const editReview = {
                $pull : { reviews : {_id: reviewId} } 
            };

            const result = await Recipes.updateOne(recipe, editReview); 
            return result;

        } catch(err) {
            throw err; 
        }
    }, 

    // Edits an existing review
    editReview : async (recipeId, reviewBody, reviewId, userId) => {

        try {

            const filter = {_id: recipeId, reviews : {$elemMatch : {_id : reviewId}}};
            const query = {$set : {"reviews.$.body" : reviewBody}};


            const result = await Recipes.updateOne(filter, query); 

            return result; 
        } catch(err) {
            throw err; 
        }

    },
    
};

// Export Function
module.exports = recipeService;
