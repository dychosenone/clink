const path = require('path');

const json = require('body-parser');
var express = require('express');
var router = express.Router();

const model = require('../models/db.js');

// Controllers
const register = require('../controllers/register');
const login = require('../controllers/login');
const recipe = require('../controllers/recipe');


/* GET home page. */
router.post('/register', register.postRegister);

router.post('/login', login.postLogin);

router.get('/getRecipes', recipe.getRecipes);
router.get('/getRecipe', recipe.getRecipe);

module.exports = router;