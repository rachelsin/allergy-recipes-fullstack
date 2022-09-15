import { actions } from "../actions/action";
import localStorageFunction from "../../services/localStorage";

export const recipeCrud = ({ dispatch, getState }) => next => action => {
    const myHeaders = new Headers();
    if (action.type === 'ADD_NEW_RECIPE') {
        const token = localStorageFunction.getJwt();
        myHeaders.append("x-auth-token", token);
        const { title, description, image, tagsFreeOf, ingredients, preparation } = action.payload;
        const { userId } = getState().user;

        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        formdata.append("image", image);
        formdata.append("tagsFreeOf", JSON.stringify(tagsFreeOf));
        formdata.append("ingredients", JSON.stringify(ingredients));
        formdata.append("preparation", JSON.stringify(preparation));
        formdata.append("userId", JSON.stringify(userId));

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:5001/addRecipe", requestOptions)
            .then(response => response.json())
            .then(result => {
                dispatch(actions.setSucceededAddRecipe(true))
            })
            .catch(error => {
                dispatch(actions.setSucceededAddRecipe(false))
            });
    }

    if (action.type === 'GET_RECIPES_BY_TAGS') {
        myHeaders.append("Content-Type", "application/json");
        const { tags, page } = action.payload;
        let searchString;
        tags === null || tags === '' ? searchString = '' : searchString = tags.join('+');

        fetch(`http://localhost:5001/recipes/search/?tags=${searchString}&page=0${page}`)
            .then((response) => response.json())
            .then((result) => {
                dispatch(actions.setARecipes(result));
            })
            .catch(error => console.log('error', error));
    }

    if (action.type === 'GET_RECIPE_BY_ID') {
        const id = action.payload;
        fetch(`http://localhost:5001/recipe/${id}`)
            .then(response => response.json())
            .then((result) => {
                dispatch(actions.setSelectedRecipe(result.recipe));
            })
            .catch(err => console.log('error:', err));
    }

    return next(action);
}
