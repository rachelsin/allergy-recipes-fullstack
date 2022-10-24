import { actions } from "../actions/action";
import localStorageFunction from "../../services/localStorage";
import axios from "axios";


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
    if (action.type === 'GET_MY_RECIPES') {
        const { userId } = getState().user;

        const config = {
            method: 'get',
            url: `http://localhost:5001/myRecipes/${userId}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(config)
            .then(response => {
                dispatch(actions.setMyRecipes(response.data))
            })
            .catch(error => {
                console.log(error);
            });
    }
    /*  if (action.type === 'GET_MY_RECIPES_FAVORITES') {
         const { userId } = getState().user;
 
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
         const { userId } = getState().user;
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
                 console.log(response.data);
                 dispatch(actions.setMyFavorites(response.data.myFavorite))
             })
             .catch(error => {
                 console.log(error);
             });
     }
 
     if (action.type === 'GET_ARRAY_FAVORITE') {
         const { userId } = getState().user;
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
     } */
    if (action.type === 'DELETE_RECIPE') {
        const id = action.payload;
        const config = {
            method: 'delete',
            url: `http://localhost:5001/deleteRecipe/${id}`,
        };
        axios(config)
            .then(response => {
                dispatch(actions.setSucceededDeleteRecipe(true))
            })
            .catch(error => {
                console.log(error);
            });
    }
    if (action.type === 'EDIT_RECIPE') {
        const token = localStorageFunction.getJwt();
        myHeaders.append("x-auth-token", token);
        const { title, description, tagsFreeOf, ingredients, preparation, id } = action.payload;
        const { userId } = getState().user;

        let data = { title, description, tagsFreeOf, ingredients, preparation, userId }

        // formdata.append("userId", JSON.stringify(userId));
        axios.put(`http://localhost:5001/editRecipe/${id}`, data, )
            .then(response => dispatch(actions.setSucceededEditRecipe(true)))
            .catch(error => dispatch(actions.setSucceededEditRecipe(false)));
    }
    if (action.type === 'UPDATE_RECIPE') {
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
                dispatch(actions.setSucceededUpdateRecipe(true))
            })
            .catch(error => {
                dispatch(actions.setSucceededUpdateRecipe(false))
            });
    }

    return next(action);
}
