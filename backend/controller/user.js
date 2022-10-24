const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
dotenv.config();
const _ = require("lodash");

const { saveUser, cheackSignUser } = require('../store/user');

const signup = async ({ body: { email, password, name } }, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: email });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        email,
        password,
        name
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.json({ status: 200 })
    console.log('success create user');
}
/* const signup = async ({ body: { email, password, name } }, res, next) => {
    try {
        let newUser = new User({
            email,
            password,
            name
        })
        const d = await User.findOne({ email })
        if (!d) {
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);

            await saveUser(newUser);
            res.json({ status: 200 })
        } else {
            next()
        }

    } catch (err) {
        console.log(err)
        res.status(404).json({ d: 'rr' })
    }
} */

/* const login = async ({ body: { email, password } }, res) => {
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
} */

const login = async (req, res, next) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
    const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET
    );
    res.json({ token: token });
    console.log('success send token');
}
/* const login = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) next()

    try {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or passwordaaaa.');
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.SECRET
        );

        res.json({ d: 'ddd' });
        console.log('success send token');

    } catch {
        console.log('ee');
        res.status(400).send('Iwwnvalid email or password.');

    }

    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
} */

module.exports = { signup, login }
