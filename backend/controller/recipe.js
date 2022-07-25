const User = require('../model/user');
const Recipe = require('../model/recipe');

// function Add a recipe 
const addRecipe = async (req, res) => {
    const defaultImage = "https://cdn.pixabay.com/photo/2017/10/22/21/41/turmeric-2879382_960_720.jpg";
    try {
        const newRecipe = new Recipe({
            nameRecipe: req.body.nameRecipe,
            description: req.body.description,
            recipeImage: req.body.recipeImage ? req.body.recipeImage : defaultImage,
            author: req.body.author,
            tagsFreeOf: req.body.tagsFreeOf,
            ingredients: req.body.ingredients,
            preparation: req.body.preparation,
            user_id: req.body.user_id,
        })
        console.log(newRecipe);

        const recipe = await newRecipe.save();
        console.log(recipe);
        res.json({ status: 200 })
        console.log('succes create new recipe');

    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
};

const recpies_get_all = async (req, res, next) => {
    try {
        const PAGE_SIZE = 3;
        const page = parseInt(req.query.page || "0");
        const total = await Recipe.countDocuments({});

        const recipes = await Recipe.find().sort({ date: -1 })
            .limit(PAGE_SIZE)
            .skip(PAGE_SIZE * page)
        res.status(200).send({
            recipes,
            total: Math.ceil(total / PAGE_SIZE)
        });
    } catch (error) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};
// const recpies_get_all = async (req, res, next) => {
//     try {
//         // const { page = 1, limit = 3 } = req.query;

//         const recipes = await Recipe.find()
//         // .limit(limit * 1).skip((page - 1) * limit);
//         res.status(200).send(recipes)
//     } catch (error) {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     }
// };




module.exports = { addRecipe, recpies_get_all }
