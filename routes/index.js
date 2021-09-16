// External Plugins
const json = require('body-parser');
var express = require('express');
var router = express.Router();
const path = require('path');

// Database Model
const model = require('../models/db.js');

// Middlewares
const token = require('../middlewares/auth');

// Controllers
const register = require('../controllers/register');
const login = require('../controllers/login');
const recipe = require('../controllers/recipe');
const profile = require('../controllers/profile');

// File Upload
const multer = require('multer');
const {v4: uuidv4} = require('uuid');

// File Database Setup
const recipeImageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },

  filename : (req, file, cb) => {
      cb(null, uuidv4() + ".jpg");
  }
});

// Multer Configuration
const recipeImageUpload = multer({ storage: recipeImageStorage });

// API Call Routes
router.post('/register', register.postRegister);

router.post('/login', login.postLogin);
router.get('/logout', token.authenticateToken, login.logout);

router.get('/profile/', token.authenticateToken, profile.viewProfile);
router.put('/profile', token.authenticateToken, profile.editProfile);
router.put('/changePassword', token.authenticateToken, profile.changePassword);

router.get('/username/:id', profile.getUsername);

router.get('/getRecipes', recipe.getRecipes);
router.get('/getRecipe/:id', recipe.getRecipe);
router.get('/searchRecipe/:searchQuery', recipe.searchRecipe);
router.post('/postRecipe', token.authenticateToken, recipeImageUpload.single('recipe-image'), recipe.postRecipe);
router.delete('/deleteRecipe/:id', recipe.deleteRecipe);
router.post('/updateRecipe', recipeImageUpload.single('recipe-image'), recipe.updateRecipe);

router.post('/updateRecipe', token.authenticateToken, recipe.updateRecipe);
router.post('/updateImage', token.authenticateToken, recipeImageUpload.single('recipe-image'), recipe.updateImage);

router.get('/getReviews/:recipeId', recipe.getReview);
router.post('/addReview', recipe.addReview);
router.delete('/deleteReview/:recipeId/:reviewId', token.authenticateToken, recipe.deleteReview);
router.put('/editReview', recipe.editReview);

router.get('/image/:filename', recipe.getImage);


// Export Function
module.exports = router;