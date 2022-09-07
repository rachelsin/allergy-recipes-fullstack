import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {
    user: {
        userName: null,
        id: "",
    },
    userId: null,
    signup: null,
    login: null,
};

const userData = {
    setSucceededLogin(state, action) {
        state.login = action.payload;
    },
    setUserId(state, action) {
        state.userId = action.payload.id;
    },
    setSucceededSignup(state, action) {
        state.signup = action.payload;
    },
    setUser(state, action) {
        state.user.userName = action.payload.name;
        state.user.id = action.payload._id;
    },
    setRemoveUser(state, action) {
        state.user.userName = null;
        state.user.id = null;
    },
}
export default produce((state, action) => createReducer(state, action, userData), initialState);