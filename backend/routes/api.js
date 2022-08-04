const router = require('express').Router();
const user = require('../controller/user');
const recipe = require('../controller/recipe');
const auth = require("../middleware/auth");
// const upload = require('../middleware/upload');


// api user
router.post('/signup', user.signup);
router.post('/login', user.login);

// router.post('/addRecipe', upload.single('image'), recipe.addRecipe);
router.post('/addRecipe', recipe.addRecipe);


// router.get('/recipes', recipe.recpies_get_all);
// router.get('/recipes/search/:tag', recipe.search_by_tags);
router.get('/recipes/search', recipe.search_by_tags);



module.exports = router;
