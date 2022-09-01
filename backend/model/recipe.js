const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    nameRecipe: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
    },
    recipeImage: {
        type: String
    },
    tagsFreeOf: {
        type: Array,
        required: true,
        minlength: 1,
    },
    ingredients: [
        {
            qty: String,
            measurement: String,
            ingredient: String
        }
    ],
    preparation: {
        type: Array,
        
    },
    author: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [
        { type: mongoose.Types.ObjectId, ref: 'User' }
    ],

})

module.exports = mongoose.model('Recipe', RecipeSchema);