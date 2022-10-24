const router = require('express').Router();
const user = require('../controller/user');
const recipe = require('../controller/recipe');
const auth = require("../middleware/auth");
const upload = require('../middleware/upload');

router.post('/signup', user.signup);
router.post('/login', user.login);
router.post('/addRecipe', auth, upload.single('image'), recipe.addRecipe);
// router.post('/addRecipe', upload.single('image'), recipe.addRecipe);
router.put('/editRecipe/:id', recipe.editRecipe);
router.delete('/deleteRecipe/:id', recipe.deleteRecipe);

router.get('/recipes/search', recipe.searchByTags);
router.get('/recipe/:id', recipe.getRecipe);
router.get('/myRecipes/:userId', recipe.getMyRecipes);

router.post('/addToFavorites/:userId', recipe.addToFavorites);
router.get('/getArrayFavorite/:userId', recipe.getArrayFavorite);
router.get('/myRecipesFavorites/:userId', recipe.myRecipesFavorites);


module.exports = router;
