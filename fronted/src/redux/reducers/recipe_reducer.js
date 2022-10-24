import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {
    recipesSearchResults: [],
    numberOfPages: 0,
    selectedRecipe: null,
    succeededAddRecipe: null,
    // arrayFavorites: [],
    // myFavorites: ['1'],
    // myRecipesFavorites: [],
    myRecipe: {
        recipes: [],
        numberOfPages: 0
    },
    deleteRecipe:false,
    succeededEditRecipe:null

};

const recipeData = {
    setSelectedRecipe(state, action) {
        state.selectedRecipe = action.payload;
    },
    setSucceededAddRecipe(state, action) {
        state.succeededAddRecipe = action.payload;
    },
    setARecipes(state, action) {
        state.recipesSearchResults = action.payload.recipes;
        state.numberOfPages = action.payload.totalPages;
    },
    setMyRecipes(state, action) {
        state.myRecipe.recipes = action.payload;
    },/* 
    setArrayFavorites(state, action) {
        state.arrayFavorites = action.payload
    },
    setMyFavorites(state, action) {
        state.myFavorites = action.payload;
    },
    setMyRecipesFavorites(state, action) {
        state.myRecipesFavorites = action.payload;
    }, */
    setSucceededDeleteRecipe(state, action) {
        state.deleteRecipe = action.payload;
    },
    setSucceededEditRecipe(state, action) {
        state.succeededEditRecipe = action.payload;
    }
}
export default produce((state, action) => createReducer(state, action, recipeData), initialState);