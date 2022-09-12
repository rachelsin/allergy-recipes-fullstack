// const User = require('../model/user');
const Recipe = require('../model/recipe');
const RecipeImage = require('../model/recipeImage');

const { saveRecipe, countRecipes, findRecipesByTags, findOneRecipe } = require('../store/recipe');

const { PAGE_SIZE } = require('../config/config');


// const addRecipe = async ({ body: { nameRecipe, description, tagsFreeOf, ingredients, preparation, user_id, recipeImage } }, res) => {
const addRecipe = async (req, res) => {
    console.log('came here');
    const { nameRecipe, description, tagsFreeOf, ingredients, preparation, user_id, recipeImage } = req.body;
    const path = req?.file?.path;
    try {
        const newRecipe = new Recipe({
            nameRecipe,
            description,
            recipeImage: path ? path.replace('\\', '/') : recipeImage,
            tagsFreeOf: JSON.parse(tagsFreeOf),
            ingredients: JSON.parse(ingredients),
            preparation: JSON.parse(preparation),
            user_id: JSON.parse(user_id),
        })
        await saveRecipe(newRecipe);
        res.json({ status: 200 })
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}

const searchByTags = async ({ query: { tags, page } }, res) => {
    try {
        const tagsName = tags.split(' ');
        const pageInt = parseInt(page || "0");
        const total = await countRecipes(tags, tagsName);
        const recipes = await findRecipesByTags(tags, tagsName, PAGE_SIZE, pageInt);
        res.status(200).send({
            recipes,
            totalPages: Math.ceil(total / PAGE_SIZE),
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
};

const getRecipe = async ({ params: { id } }, res) => {
    try {
        const recpie = await findOneRecipe(id)
        res.status(200).json({
            recpie: recpie
        })
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}


module.exports = { addRecipe, searchByTags, getRecipe }
