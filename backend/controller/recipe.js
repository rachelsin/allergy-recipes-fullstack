// const User = require('../model/user');
const Recipe = require('../model/recipe');

const { saveRecipe, countRecipes, findRecipesByTags, findOneRecipe } = require('../store/recipe');

const { PAGE_SIZE } = require('../config/config');


const addRecipe = async ({ body: { nameRecipe, description, tagsFreeOf, ingredients, preparation, user_id, recipeImage } }, res) => {
    try {
        const newRecipe = new Recipe({
            nameRecipe,
            description,
            recipeImage,
            tagsFreeOf,
            ingredients,
            preparation,
            user_id,
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
