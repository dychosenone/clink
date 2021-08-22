const path = require('path');

const json = require('body-parser');
var express = require('express');
var router = express.Router();

const model = require('../models/db.js');

// Middlewares
const checkLogin = require('../middlewares/checkLogin');

// Controllers
const register = require('../controllers/register');
const login = require('../controllers/login');
const recipe = require('../controllers/recipe');
const profile = require('../controllers/profile');

const multer = require('multer');
const {v4: uuidv4} = require('uuid');

const recipeImageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },

  filename : (req, file, cb) => {
      cb(null, uuidv4() + ".jpg");
  }
})
const recipeImageUpload = multer({ storage: recipeImageStorage });

/* GET home page. */
router.post('/register', register.postRegister);

router.post('/login', login.postLogin);
router.get('/logout', checkLogin(), login.logout);


router.get('/viewProfile', profile.viewProfile);
router.put('/updateProfile', profile.editProfile);

router.get('/getRecipes', recipe.getRecipes);
router.get('/getRecipe', recipe.getRecipe);
router.get('/searchRecipe', recipe.searchRecipe);
router.post('/postRecipe', recipeImageUpload.single('recipe-image'), recipe.postRecipe);
router.delete('/deleteRecipe', recipe.deleteRecipe);
router.put('/updateRecipe', recipeImageUpload.single('recipe-image'), recipe.updateRecipe);

router.put('/changePassword', profile.changePassword);

router.post('/addReview', recipe.addReview);
router.delete('/deleteReview', recipe.deleteReview);
router.put('/editReview', recipe.editReview);
module.exports = router;