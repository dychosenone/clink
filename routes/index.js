const path = require('path');

const json = require('body-parser');
var express = require('express');
var router = express.Router();

const model = require('../models/db.js');

// Controllers
const register = require('../controllers/register');
const login = require('../controllers/login');
const recipe = require('../controllers/recipe');

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
router.get('/logout', login.logout);

router.get('/getRecipes', recipe.getRecipes);
router.get('/getRecipe', recipe.getRecipe);
router.post('/postRecipe', recipeImageUpload.single('recipe-image'), recipe.postRecipe);

module.exports = router;