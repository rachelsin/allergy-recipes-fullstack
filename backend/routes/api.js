const router = require('express').Router();
const user = require('../controller/user');
const recipe = require('../controller/recipe');


const auth = require("../middleware/auth");


// api user
router.post('/signup', user.signup);
router.post('/login', user.login);
router.post('/addRecipe', recipe.addRecipe);



module.exports = router;
