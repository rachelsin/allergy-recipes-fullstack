import { configureStore } from '@reduxjs/toolkit'
// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension';
import recipeData from '../reducers/recipe_reducer'
import userData from '../reducers/user_reducer'
import { userCrud } from "../middleware/userCrud";
import { recipeCrud } from "../middleware/recipeCrud";

// const reducer = combineReducers({ publicData, recipeData })
const store = configureStore({
    reducer: {
        recipe: recipeData,
        user: userData,
    },
    middleware: [recipeCrud, userCrud],
})

export default store;