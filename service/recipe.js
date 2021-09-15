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
    },

    deleteRecipe: async (data) => Recipes.deleteOne(data), 

    updateRecipe: async (data) => {
            const recipe = await recipeService.getRecipe({ _id: data._id});
            
        
            //console.log(data);
            //console.log(data.confirmpassword);

            if(data.name !== '') {
                recipe.name = data.name; 
            }
        
            if(data.prepTime !== '') {
                recipe.prepTime = data.prepTime; 
            }
        
            //if(data.author !== '') {
            //    recipe.author = data.author; 
            //}
        
            if(data.ingredients !== '') {
                recipe.ingredients = data.ingredients; 
            }

            if(data.steps !== '') {
                recipe.steps = data.steps; 
            }
            
            return recipe.save();
    }, 

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

    editReview : async (recipeId, reviewBody, reviewId, userId) => {

        try {

            //const review = await recipeService.getRecipe({_id : recipeId, "reviews.userId" : reviewId});
            const review = {_id : recipeId, "reviews._id" : reviewId};
            //recipes.find({"review._id": reviewId});

            const editReview = {
                $set : { "reviews.$.body" : String(reviewBody) } 
            };

            const result = await Recipes.updateOne(review, editReview); 

            //recipes.reviews.getReview({_id: reviewId});
            //if(userId == review.userId) {
            //    review.body = reviewBody; 
                
            //    return review.save(); 
            //} else {
            //    console.log("wrong user!");
            //}
            return result; 
        } catch(err) {
            throw err; 
        }
        
    }, 
    
};

module.exports = recipeService;
