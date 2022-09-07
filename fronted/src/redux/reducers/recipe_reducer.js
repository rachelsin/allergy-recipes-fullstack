import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from "./reducerUtils";

const initialState = {
    recipesSearchResults: [],
    numberOfPages: 0,
    selectedRecipe: null,
    succeededAddRecipe: null,
    // search: {
    //     pageIndex: null,
    //     tagsFreeOf: null
    // },
    // historySearch: null,
    // recpieId: "ddd",
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
    /*  getRecipeId(state, action) {
         state.recpieId = action.payload;
     }, */

    // setSearch(state, action) {
    //     state.search.tagsFreeOf = action.payload.checked;
    //     state.search.pageIndex = action.payload.pageNumber;
    // },
    // setHistorySearch(state, action) {
    //     state.historySearch = action.payload;
    // }
}
export default produce((state, action) => createReducer(state, action, recipeData), initialState);