const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    nameRecipe: {
        type: String
    },
    description: {
        type: String
    },
    recipeImage: {
        // data: Buffer,
        // contentType: String,
        type: String
    },
    author: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    tagsFreeOf: {
        type: Array
    },
    likes: [
        { type: mongoose.Types.ObjectId, ref: 'User' }
    ],
    ingredients: [
        {
            qty: String,
            measurement: String,
            ingredient: String
        }
    ],
    preparation: {
        type: Array
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Recipe', RecipeSchema);