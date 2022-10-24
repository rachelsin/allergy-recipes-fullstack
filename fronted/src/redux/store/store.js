import { configureStore } from '@reduxjs/toolkit'
// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension';
import favoriteData from '../reducers/favorite_reducer';
import recipeData from '../reducers/recipe_reducer';
import userData from '../reducers/user_reducer';
import { userCrud } from "../middleware/userCrud";
import { recipeCrud } from "../middleware/recipeCrud";
import { favoriteCrud } from "../middleware/favoriteCrud";

// const reducer = combineReducers({ publicData, recipeData })
const store = configureStore({
    reducer: {
        recipe: recipeData,
        user: userData,
        favorite: favoriteData,
    },
    middleware: [recipeCrud, userCrud, favoriteCrud],
})

export default store;