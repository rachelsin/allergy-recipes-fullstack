import { actions } from "../actions/action";
import localStorageFunction from "../../services/localStorage";
import axios from "axios";

export const favoriteCrud = ({ dispatch, getState }) => next => action => {
    const myHeaders = new Headers();
    const { userId } = getState().user;

    if (action.type === 'GET_MY_RECIPES_FAVORITES') {

        const config = {
            method: 'get',
            url: `http://localhost:5001/myRecipesFavorites/${userId}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(config)
            .then(response => {
                dispatch(actions.setMyRecipesFavorites(response.data))
            })
            .catch(error => {
                console.log(error);
            });
    }
    if (action.type === 'ADD_FAVORITE') {
        console.log('lalal');
        const config = {
            method: 'post',
            url: `http://localhost:5001/addToFavorites/${userId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: { recipeId: action.payload }
        };
        axios(config)
            .then(response => {
                dispatch(actions.setMyFavorites(response.data.myFavorite))
            })
            .catch(error => {
                console.log(error);
            });
    }

    if (action.type === 'GET_ARRAY_FAVORITE') {

        const config = {
            method: 'get',
            url: `http://localhost:5001/getArrayFavorite/${userId}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(config)
            .then(response => {
                dispatch(actions.setMyFavorites(response.data))
            })
            .catch(error => {
                console.log(error);
            });
    }

    return next(action);
}
