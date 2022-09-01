const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    myRecipes: [
        { type: mongoose.Types.ObjectId, ref: 'Recipe' }
    ],
    favoriteRecipes: [
        { type: mongoose.Types.ObjectId, ref: 'Recipe' }
    ]
})

module.exports = mongoose.model('User', UserSchema);