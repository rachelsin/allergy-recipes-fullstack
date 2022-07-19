import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {

    namess: false
};

const recipeData = {

}
export default produce((state, action) => createReducer(state, action, recipeData), initialState);