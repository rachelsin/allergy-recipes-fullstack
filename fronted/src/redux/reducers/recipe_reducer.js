import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {
    recipesSearchResults: [],
    numberOfPages: 0,
    selectedRecipe: null,
    succeededAddRecipe: null,
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
}
export default produce((state, action) => createReducer(state, action, recipeData), initialState);