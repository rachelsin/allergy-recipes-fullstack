import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {
    arrayFavorites: [],
    myFavorites: ['1'],
    myRecipesFavorites: [],
};

const favoriteData = {
    setArrayFavorites(state, action) {
        state.arrayFavorites = action.payload
    },
    setMyFavorites(state, action) {
        state.myFavorites = action.payload;
    },
    setMyRecipesFavorites(state, action) {
        state.myRecipesFavorites = action.payload;
    },
}
export default produce((state, action) => createReducer(state, action, favoriteData), initialState);