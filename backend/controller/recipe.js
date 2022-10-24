const Recipe = require('../model/recipe');
const User = require('../model/user');
const { saveRecipe, countRecipes, findRecipesByTags, findOneRecipe, deleteOneRecipe } = require('../store/recipe');
const { PAGE_SIZE } = require('../config/config');
const { findById } = require('../model/recipe');


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
        await User.findByIdAndUpdate({ _id: recipe.user_id }, { $push: { 'myRecipes': recipe._id } });
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
        const recipes = await Recipe.find({ user_id: userId });
        console.log(recipes);
        res.status(200).send(recipes)
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}
const myRecipesFavorites = async ({ params: { userId } }, res) => {
    try {
        const recipes = await User.findById({ _id: userId }).populate('favoriteRecipes');
        console.log(recipes.favoriteRecipes);
        res.status(200).send(recipes.favoriteRecipes)
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}
const addToFavorites = async (req, res) => {
    console.log('hi');
    const userId = req.params.userId;
    const recipeId = req.body.recipeId;
    let user = await User.findById(userId);
    const myFavorites = user.favoriteRecipes;
    if (myFavorites.includes(recipeId)) {
        console.log('it is includes')
        const user = await User.findByIdAndUpdate({ _id: userId }, { $pull: { 'favoriteRecipes': recipeId } }, { new: true })
        res.json({ status: 200, myFavorite: user.favoriteRecipes })
        /*   let user = await User.findByIdAndUpdate(
              req.params.id,
              { $pull: { 'cards': req.body.cards } },
              { new: true }
          );
          console.log(user);
          user = await user.save();
          res.send(user); */
    } else {
        console.log('it is not includes')
        const user = await User.findByIdAndUpdate({ _id: userId }, { $push: { 'favoriteRecipes': recipeId } }, { new: true })
        res.json({ status: 200, myFavorite: user.favoriteRecipes })
    }

}

const getArrayFavorite = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.userId });
        console.log(user);
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
/* const editRecipe = async ({ body: { title, id } }, res) => {
    console.log(title, id);
    const recipe = await Recipe.findOneAndUpdate(
        { id },
        title
    );
    if (!recipe)
        return res.status(404).send("The recipe with the given ID was not found.");
    console.log("succes edit recipe");
    res.status(200).send("succes edit recipe")

} */

const editRecipe = async ({ body: { title, description, tagsFreeOf, ingredients, preparation, userId }, params: { id } }, res) => {
    try {
        console.log(title, description, tagsFreeOf, ingredients, preparation, userId, id);
        const findRecipe = await findOneRecipe(id)
        let image = findRecipe.image
        const recipe = await Recipe.findByIdAndUpdate(
            id,
            { $set: { title, description, image, tagsFreeOf, ingredients, preparation, user_id: userId } }, { new: true }
        );
        console.log('the recipe update', recipe);
        res.json({ status: 200 })
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}

module.exports = { addRecipe, searchByTags, getRecipe, getMyRecipes, addToFavorites, getArrayFavorite, myRecipesFavorites, deleteRecipe, editRecipe }
