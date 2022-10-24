import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {
    statusLogin: false,
    errorsSignup: false,
    userId: null,
    signup: null,
    login: null,
};

const userData = {
    setSucceededLogin(state, action) {
        state.login = action.payload;
    },
    setUserId(state, action) {
        // console.log(action.payload);
        state.userId = action.payload.id;
    },
    setSucceededSignup(state, action) {
        state.signup = action.payload;
    },
    setStatusLogin(state, action) {
        state.statusLogin = action.payload;
        // state.user.id = action.payload._id;
    },
    setRemoveUser(state, action) {
        state.user.userName = null;
        state.user.id = null;
    },
    setStatusSignup(state, action) {
        state.errorsSignup = action.payload
    }
}
export default produce((state, action) => createReducer(state, action, userData), initialState);