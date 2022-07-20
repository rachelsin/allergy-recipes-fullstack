import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {

    namess: false,
    recipesA: [],
    numberOfPages: 0
};

const recipeData = {
    setARecipes(state, action) {
        state.recipesA = action.payload.recipes;
        state.numberOfPages = action.payload.total;
    },
}
export default produce((state, action) => createReducer(state, action, recipeData), initialState);