import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {
    userData: null,
    token: null,
};

const publicData = {
    setUserData(state, action) {
        state.userData = action.payload;
    },
    setToken(state, action) {
        state.token = localStorage.getItem("token");
    }
}
export default produce((state, action) => createReducer(state, action, publicData), initialState);