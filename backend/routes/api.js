const router = require('express').Router();
const user = require('../controller/user');
const recipe = require('../controller/recipe');
const auth = require("../middleware/auth");

router.post('/signup', user.signup);
router.post('/login', user.login);
router.post('/addRecipe', auth, recipe.addRecipe);
router.get('/recipes/search', recipe.searchByTags);
router.get('/recipe/:id', recipe.getRecipe);

// const upload = require('../middleware/upload');

// const Recipe = require('../model/recipe');
// const fs = require('fs');

// router.post('/addRecipe', upload.single('recipeImage'), recipe.addRecipe);

/* router.post("/up", upload.single("testImage"), (req, res) => {
    const saveImage = Recipe({
        nameRecipe: req.body.name,
        recipeImage: {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/png",
        },
    });
    saveImage
        .save()
        .then((res) => {
            console.log("image is saved");
        })
        .catch((err) => {
            console.log(err, "error has occur");
        });
    res.send('image is saved')
}); */

module.exports = router;
