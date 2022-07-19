import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {
    recipes: "",
    totalPage: "",
    admin: "rachel",
    nameState: false
};

const publicData = {
    setRecipes(state, action) {
        state.recipes = action.payload.recipes;
        state.totalPage = action.payload.total;
    },
    setName(state, action) {
        state.nameState = action.payload;
    }
}
export default produce((state, action) => createReducer(state, action, publicData), initialState);