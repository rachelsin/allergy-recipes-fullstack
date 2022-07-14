const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    nameRecipe: {
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
    theRecipe: {
        description: String,
        ingredients: [
            {
                qty: String,
                measurement: String,
                ingredient: String
            }
        ],
        preparation: {
            type: Array
        }
    }


})

module.exports = mongoose.model('Recipe', RecipeSchema);