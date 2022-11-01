const Recipe = require('../model/recipe');
const User = require('../model/user');


const saveRecipe = (newRecipe) => {
    return newRecipe.save();
}

const addRecipeToMyRecipesInUser = (userId, id) => {
    return User.findByIdAndUpdate({ _id: userId }, { $push: { 'myRecipes': id } });
}

const findRecipe = (userId) => {
    return Recipe.find({ user_id: userId });
}
const findMyFavorites = (userId) => {
    return User.findById({ _id: userId }).populate('favoriteRecipes');
}
const findUserById = (userId) => {
    return User.findById({ _id: userId });
}
const findRecipeAndEdit = (id, title, description, image, tagsFreeOf, ingredients, preparation, userId) => {
    return Recipe.findByIdAndUpdate(
        id,
        { $set: { title, description, image, tagsFreeOf, ingredients, preparation, user_id: userId } }, { new: true });
}

const removeRecipeFromFavorite = (userId, recipeId) => {
    return User.findByIdAndUpdate({ _id: userId }, { $pull: { 'favoriteRecipes': recipeId } }, { new: true })
}

const addRecipeToFavorite = (userId, recipeId) => {
    return User.findByIdAndUpdate({ _id: userId }, { $push: { 'favoriteRecipes': recipeId } }, { new: true })
}

const countRecipes = (tags, tagsName) => {
    return Recipe.countDocuments(tags.length <= 0 ? {} : { tagsFreeOf: { $all: tagsName } });
}

const findRecipesByTags = (tags, tagsName, PAGE_SIZE, pageInt) => {
    return Recipe
        .find(tags.length <= 0 ? {} : { tagsFreeOf: { $all: tagsName } })
        .sort({ date: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * pageInt)
}

const findOneRecipe = (id) => {
    return Recipe.findOne({ _id: id })
}

const deleteOneRecipe = (id) => {
    return Recipe.findOneAndRemove({
        _id: id
    });
}

module.exports = { saveRecipe, addRecipeToMyRecipesInUser, countRecipes, findRecipesByTags, findOneRecipe, deleteOneRecipe, findRecipe, findMyFavorites, findRecipeAndEdit, findUserById, removeRecipeFromFavorite, addRecipeToFavorite }