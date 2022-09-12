import { actions } from "../actions/action";
import localStorageFunction from "../../services/localStorage";

export const recipeCrud = ({ dispatch, getState }) => next => action => {
    const myHeaders = new Headers();
    if (action.type === 'ADD_NEW_RECIPE') {
        const token = localStorageFunction.getJwt();
        myHeaders.append("x-auth-token", token);
        const { nameRecipe, description, recipeImage, tagsFreeOf, ingredients, preparation } = action.payload;
        const { userId } = getState().user;

        var formdata = new FormData();
        formdata.append("nameRecipe", nameRecipe);
        formdata.append("description", description);
        formdata.append("recipeImage", recipeImage);
        formdata.append("tagsFreeOf", JSON.stringify(tagsFreeOf));
        formdata.append("ingredients", JSON.stringify(ingredients));
        formdata.append("preparation", JSON.stringify(preparation));
        formdata.append("user_id", JSON.stringify(userId));

        var requestOptions = {
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
    if (action.type === 'ADD_NEW_RECIPE7777') {
        const token = localStorageFunction.getJwt();
        myHeaders.append("x-auth-token", token);
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({
            "nameRecipe": action.payload.nameRecipe,
            "tagsFreeOf": action.payload.tagsFreeOf,
            "description": action.payload.description,
            "ingredients": action.payload.ingredients,
            "preparation": action.payload.preparation,
            "recipeImage": action.payload.recipeImage,
            "user_id": getState().user.userId
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://localhost:5001/addRecipe", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                dispatch(actions.setSucceededAddRecipe(true))
            })
            .catch(error => {
                console.log('error', error);
                dispatch(actions.setSucceededAddRecipe(false))
            });
    }

    if (action.type === 'GET_RECIPES_BY_TAGS') {
        myHeaders.append("Content-Type", "application/json");
        const { tags, page } = action.payload;
        let searchString;
        if (tags === undefined || tags === '' || typeof tags === 'undefined' || tags === null) {
            searchString = ""
        } else {
            searchString = tags.join('+');
        }

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
                dispatch(actions.setSelectedRecipe(result));
            })
            .catch(err => console.log('error:', err));
    }

    return next(action);
}
