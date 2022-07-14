const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    myRecipes: [
        { type: mongoose.Types.ObjectId, ref: 'Recipe' }
    ],
    favoriteRecipes: [
        { type: mongoose.Types.ObjectId, ref: 'Recipe' }
    ]
})

module.exports = mongoose.model('User', UserSchema);