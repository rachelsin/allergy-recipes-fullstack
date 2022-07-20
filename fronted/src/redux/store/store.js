import { configureStore } from '@reduxjs/toolkit'
// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension';
import publicData from '../reducers/public_reducer'
import recipeData from '../reducers/recipe_reducer'
import { userCrud } from "../middleware/userCrud";
import { recipeCrud } from "../middleware/recipeCrud";

// const reducer = combineReducers({ publicData, recipeData })
const store = configureStore({
    reducer: {
        public: publicData,
        recipe: recipeData,
    },
    middleware: [recipeCrud, userCrud],
})

export default store;