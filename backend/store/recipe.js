const Recipe = require('../model/recipe');


const saveRecipe = (newRecipe) => {
    return newRecipe.save();
}

const countRecipes = (tags, tagsName) => {
    return Recipe.countDocuments(tags.length <= 0 ? {} : { tagsFreeOf: { $all: tagsName } });
}
const findByTags = (tags, tagsName, PAGE_SIZE, pageInt) => {
    return Recipe
        .find(tags.length <= 0 ? {} : { tagsFreeOf: { $all: tagsName } })
        .sort({ date: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * pageInt)
}

const findOne = (id) => {
    return Recipe.findById(id)

}

module.exports = { saveRecipe, countRecipes, findByTags, findOne }
