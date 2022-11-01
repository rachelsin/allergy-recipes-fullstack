const Recipe = require('../model/recipe');
const User = require('../model/user');
const { saveRecipe, addRecipeToMyRecipesInUser, countRecipes, findRecipe, findRecipesByTags, findOneRecipe, deleteOneRecipe, findMyFavorites, findRecipeAndEdit, findUserById, addRecipeToFavorite, removeRecipeFromFavorite } = require('../store/recipe');
const { PAGE_SIZE } = require('../config/config');


const addRecipe = async ({ body: { title, description, image, tagsFreeOf, ingredients, preparation, userId }, file }, res) => {
    try {
        const newRecipe = new Recipe({
            title,
            description,
            image: file?.path ? file.path.replace('\\', '/') : image,
            tagsFreeOf: JSON.parse(tagsFreeOf),
            ingredients: JSON.parse(ingredients),
            preparation: JSON.parse(preparation),
            user_id: JSON.parse(userId),
        })
        const recipe = await saveRecipe(newRecipe);
        await addRecipeToMyRecipesInUser(recipe.user_id, recipe._id)
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
        const recipe = await findOneRecipe(id)
        res.status(200).json({ recipe })
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}
const getMyRecipes = async ({ params: { userId } }, res) => {
    try {
        const recipes = await findRecipe(userId)
        res.status(200).send(recipes)
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}
const myRecipesFavorites = async ({ params: { userId } }, res) => {
    try {
        const recipes = await findMyFavorites(userId)
        res.status(200).send(recipes.favoriteRecipes)
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}
const addToFavorites = async ({ params: { userId }, body: { recipeId } }, res) => {
    let user = await findUserById(userId)
    const myFavorites = user.favoriteRecipes;
    if (myFavorites.includes(recipeId)) {
        const user = await removeRecipeFromFavorite(userId, recipeId)
        res.json({ status: 200, myFavorite: user.favoriteRecipes })
    } else {
        const user = await addRecipeToFavorite(userId, recipeId)
        res.json({ status: 200, myFavorite: user.favoriteRecipes })
    }
}

const getArrayFavorite = async ({ params: { userId } }, res) => {
    try {
        const user = await findUserById(userId)
        res.status(200).send(user.favoriteRecipes)
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}

const deleteRecipe = async ({ params: { id } }, res) => {
    const recipe = await deleteOneRecipe(id);
    if (!recipe)
        return res.status(404).send("The recipe with the given ID was not found.");
    console.log("succes delete recipe");
    res.status(200).send("succes delete recipe")
}

const editRecipe = async ({ body: { title, description, tagsFreeOf, ingredients, preparation, userId }, params: { id } }, res) => {
    try {
        const findRecipe = await findOneRecipe(id);
        let image = findRecipe.image
        const recipe = await findRecipeAndEdit(id, title, description, image, tagsFreeOf, ingredients, preparation, userId)
        res.json({ status: 200 })
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}

module.exports = { addRecipe, searchByTags, getRecipe, getMyRecipes, addToFavorites, getArrayFavorite, myRecipesFavorites, deleteRecipe, editRecipe }
