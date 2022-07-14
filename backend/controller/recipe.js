const User = require('../model/user');
const Recipe = require('../model/recipe');

// function Add a recipe 
const addRecipe = async (req, res) => {
    const newRecipe = new Recipe(req.body)
    try {
        const recipe = await newRecipe.save();
        console.log(recipe);
        res.json({ status: 200 })
        console.log('succes create new recipe');

    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}




module.exports = { addRecipe }
