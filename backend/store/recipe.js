const Recipe = require('../model/recipe');


const saveRecipe = (newRecipe) => {
    return newRecipe.save();
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

module.exports = { saveRecipe, countRecipes, findRecipesByTags, findOneRecipe, deleteOneRecipe }