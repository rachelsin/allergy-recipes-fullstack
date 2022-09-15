const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    description: {
        type: String,
        maxlength: 1024
    },
    image: {
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
    user_id: {
        type: mongoose.Types.ObjectId, ref: 'User'
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