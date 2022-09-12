const router = require('express').Router();
const user = require('../controller/user');
const recipe = require('../controller/recipe');
const auth = require("../middleware/auth");
const upload = require('../middleware/upload');

router.post('/signup', user.signup);
router.post('/login', user.login);
router.post('/addRecipe', auth, upload.single('recipeImage'), recipe.addRecipe);
router.get('/recipes/search', recipe.searchByTags);
router.get('/recipe/:id', recipe.getRecipe);


module.exports = router;
