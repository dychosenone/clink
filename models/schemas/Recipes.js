const mongoose = require('mongoose');

const IngredientsSchema = new mongoose.Schema({

    quantity : {
        type: Number,
        require: true
    },
    ingredientName : {
        type: String,
        require: true
    }
});

const RecipeSchema = new mongoose.Schema({

    name : {
        type: String, 
        require: true
    },

    image : {
        type: String, 
        require: true
    },

    prepTime : {
        type: Number, 
        require: true
    },

    ingredients : [IngredientsSchema],

    steps : {
        type: Array, 
        require: true
    },

    reviews : {
        type: Array, 
        require: false
    },

    author : {
        type: String, 
        require: true
    },

});

//Implement 
const RecipeModel = mongoose.model('recipe', RecipeSchema, 'recipes'); 

//Export 
module.exports = RecipeModel; 