import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {

    user: {
        userName: null,
        userEmail: "",
        favoriteRecipes: "",
        myRecipes: "",
        id: ""
    }
};

const userData = {
    setUser(state, action) {
        // console.log(action.payload.name);
        state.user.userName = action.payload.name;
        state.user.userEmail = action.payload.email;
        state.user.myRecipes = action.payload.myRecipes;
        // state.user.favoriteRecipes = action.payload.favoriteRecipes;
        // state.user.myRecipes = action.payload.myRecipes;
        // state.user.id = action.payload._id;
    },
    setRemoveUser(state, action) {
        console.log('here');
        // state.user = null;
        state.user.userName = null;
        state.user.userEmail = null;
        state.user.favoriteRecipes = null;
        state.user.myRecipes = null;
        state.user.id = null;
    },
}
export default produce((state, action) => createReducer(state, action, userData), initialState);