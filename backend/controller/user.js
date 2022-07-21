const User = require('../model/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// function register user
const signup = async (req, res) => {
    const newUser = new User(req.body)
    try {
        const user = await newUser.save();
        console.log(user);
        res.json({ status: 200 })
        console.log('succes create new user');

    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}

const login = async (req, res) => {
    try {
        let cheackSign = await User.findOne(
            { email: req.body.email, password: req.body.password }
        );
        console.log("cheackSign:" + cheackSign);
        if (cheackSign == null) {
            res.status(200).send("this user is not found , try again");
        } else {
            const token = jwt.sign(
                { email: req.body.email, id: cheackSign._id },
                process.env.SECRET
            );
            res.status(200).json({ token: token, cheackSign });
            console.log('token succses');

        }
    }
    catch (err) { res.status(400).send(err.message) }
}
const userData = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
        console.log('sucsses');
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { signup, login, userData }
