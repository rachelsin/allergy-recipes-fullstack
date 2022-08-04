const User = require('../model/user');
const Recipe = require('../model/recipe');

const { saveRecipe, countRecipes, findByTags } = require('../store/recipe');

const { PAGE_SIZE } = require('../config/config');

// async ({ nameRecipe = { nameRecipe: req.body.nameRecip },description={description:req.body.description} }, res) =>
// async ({ nameRecipe : { nameRecipe: req.body.nameRecip },description:{description:req.body.description} }, res) =>

// function Add a recipe 
const addRecipe = async (req, res) => {
    try {
        const { nameRecipe, description, recipeImage, author, tagsFreeOf, ingredients, preparation, user_id } = req.body;

        const defaultImage = "https://cdn.pixabay.com/photo/2017/10/22/21/41/turmeric-2879382_960_720.jpg";

        const newRecipe = new Recipe({
            nameRecipe,
            description,
            recipeImage: recipeImage ? recipeImage : defaultImage,
            author,
            tagsFreeOf,
            ingredients,
            preparation,
            user_id,
        })
        console.log(newRecipe);

        const recipe = await saveRecipe(newRecipe);
        // const recipe = await newRecipe.save();
        console.log(recipe);
        res.json({ status: 200 })
        console.log('succes create new recipe');

    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
}

const recpies_get_all = async (req, res, next) => {
    /* 
        try {
            const PAGE_SIZE = 3;
            const page = parseInt(req.query.page || "0");
            const total = await Recipe.countDocuments({});
    
            const recipes = await Recipe.find().sort({ date: -1 })
                .limit(PAGE_SIZE)
                .skip(PAGE_SIZE * page)
            res.status(200).send({
                recipes,
                totalPages: Math.ceil(total / PAGE_SIZE)
            });
        } catch (error) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        } */
};
const search_by_tags = async (req, res) => {
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




module.exports = { addRecipe, recpies_get_all, search_by_tags }
