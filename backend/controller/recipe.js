const User = require('../model/user');
const Recipe = require('../model/recipe');

// function Add a recipe 
const addRecipe = async (req, res) => {
    const newRecipe = new Recipe(req.body)
    try {
        const defaultImage = "https://cdn.pixabay.com/photo/2017/10/22/21/41/turmeric-2879382_960_720.jpg";
        newRecipe.recipeImage = req.body.recipeImage ? req.body.recipeImage : defaultImage;
        const recipe = await newRecipe.save();
        console.log(recipe);
        res.json({ status: 200 })
        console.log('succes create new recipe');

    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
};

const recpies_get_all = async (req, res, next) => {
    try {
        // const { page = 1, limit = 3 } = req.query;
        const recipes = await Recipe.find()
        // .limit(limit * 1).skip((page - 1) * limit);
        res.status(200).send(recipes)
    } catch (error) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};




module.exports = { addRecipe, recpies_get_all }
