const User = require('../model/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { saveUser, cheackSignUser } = require('../store/user');

const signup = async ({ body: { email, password, name } }, res) => {
    try {
        let newUser = new User({
            email,
            password,
            name
        })
        await saveUser(newUser);
        res.json({ status: 200 })
    } catch (err) {
        console.log(err)
        res.status(400).render('error', { error: err })
    }
}

const login = async ({ body: { email, password } }, res) => {
    try {
        let user = await cheackSignUser(email, password);

        const token = jwt.sign(
            { email, id: user._id },
            process.env.SECRET
        );
        res.status(200).json({ token: token, user });
    }
    catch (err) {
        console.log(err)
        res.status(400).render('error', { error: err })
    }
}

module.exports = { signup, login }
