import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {

    recipesA: [],
    numberOfPages: 0,
    recpieId: "ddd",
    r: null,
    // search: {
    //     pageIndex: null,
    //     tagsFreeOf: null
    // },
    // historySearch: null,
    succeededAddRecipe: null
};

const recipeData = {
    setSucceededAddRecipe(state, action) {
        state.succeededAddRecipe = action.payload;
    },
    setARecipes(state, action) {
        state.recipesA = action.payload.recipes;
        state.numberOfPages = action.payload.totalPages;
    },
    getRecipeId(state, action) {
        state.recpieId = action.payload;
    },
    setR(state, action) {
        console.log('kkk');
        state.r = action.payload;
        console.log(state.r);
    },
    // setSearch(state, action) {
    //     state.search.tagsFreeOf = action.payload.checked;
    //     state.search.pageIndex = action.payload.pageNumber;
    // },
    // setHistorySearch(state, action) {
    //     state.historySearch = action.payload;
    // }
}
export default produce((state, action) => createReducer(state, action, recipeData), initialState);