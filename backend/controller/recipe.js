const User = require('../model/user');
const Recipe = require('../model/recipe');

const { saveRecipe, countRecipes, findByTags } = require('../store/recipe');

const { PAGE_SIZE } = require('../config/config');
const { findOne } = require('../model/user');

// async ({ nameRecipe = { nameRecipe: req.body.nameRecip },description={description:req.body.description} }, res) =>
// async ({ nameRecipe : { nameRecipe: req.body.nameRecip },description:{description:req.body.description} }, res) =>

// function Add a recipe 
// const addRecipe = async ({ body: { nameRecipe, description, ...body }, file }, res) => {

const addRecipe = async (req, res) => {
    try {
        const { nameRecipe, description, tagsFreeOf, ingredients, preparation, user_id, recipeImage } = req.body;
        // console.log('req.file', req.body);
        // const { nameRecipe } = req.body;
        // const  path  = req.file.path;
        // const defaultImage = "https://cdn.pixabay.com/photo/2017/10/22/21/41/turmeric-2879382_960_720.jpg";
        // author0
        const newRecipe = new Recipe({
            nameRecipe,
            description,
            recipeImage,
            // recipeImage: recipeImage ? recipeImage : defaultImage,
            // recipeImage: req.file.path.replace('\\', '/'),
            // recipeImage: `uploads\\${req.file.name}`,
            // author,
            tagsFreeOf,
            ingredients,
            preparation,
            user_id,
        })
        console.log(newRecipe);

        // const recipe = await saveRecipe(newRecipe);
        const recipe = await newRecipe.save();
        // console.log(recipe);
        res.json({ status: 200 })
        console.log('succes create new recipe');

    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}


const searchByTags = async (req, res) => {
    try {
        const { tags, page } = req.query;
        const tagsName = tags.split(' ');
        const pageInt = parseInt(page || "0");
        // const PAGE_SIZE = 3;

        const total = await countRecipes(tags, tagsName);
        // const total = await Recipe.countDocuments(tags.length <= 0 ? {} : { tagsFreeOf: { $all: tagsName } });
        const recipes = await findByTags(tags, tagsName, PAGE_SIZE, pageInt);

        /*  const recipes = await Recipe
             .find(tags.length <= 0 ? {} : { tagsFreeOf: { $all: tagsName } })
             .sort({ date: -1 })
             .limit(PAGE_SIZE)
             .skip(PAGE_SIZE * pageInt) */
        res.status(200).send({
            recipes,
            totalPages: Math.ceil(total / PAGE_SIZE),
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
};

const getRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('ff');
        const recpie = await Recipe.findOne({ _id: id })
        // if (!recpie)
        //     return res.status(404).send("The recpie with the given ID was not found.");
        res.status(200).json({
            recpie: recpie
        })
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}

const get_recpie = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const recipe = await Recipe.findById(id)
        console.log(recipe);
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}



module.exports = { addRecipe, searchByTags, getRecipe, get_recpie }
