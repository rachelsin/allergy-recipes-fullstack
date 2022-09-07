const User = require('../model/user');

const saveUser = (newUser) => {
    return newUser.save();
}

const cheackSignUser = (email, password) => {
    return User.findOne({ email, password })
}


module.exports = { saveUser, cheackSignUser }