import { actions } from "../actions/action";

export const recipeCrud = ({ dispatch, getState }) => next => action => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (action.type === 'ADD_RECIPE') {
        const raw = JSON.stringify({
            "nameRecipe": action.payload.nameRecipe,
            "tagsFreeOf": action.payload.tagsFreeOf,
            "description": action.payload.description,
            "ingredients": action.payload.ingredients,
            "preparation": action.payload.preparation,
            "user_id": getState().user.user.id
        });
        console.log(raw);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://localhost:5001/addRecipe", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    if (action.type === 'GET_ALL_RECIPES') {
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("http://localhost:5001/recipes", requestOptions)
            .then(response => response.json())
            .then(result => {
                dispatch(actions.setRecipes(result))
                dispatch(actions.setName(true))
            })
            .catch(error => console.log('error', error));
    }
    if (action.type === 'GET_NEW_RECIPES') {
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const pageNumber = action.payload;

        fetch(`http://localhost:5001/recipes?page=0${pageNumber}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                dispatch(actions.setARecipes(result));
                // dispatch(actions.setNumberOfPages(total));
            })
            .catch(error => console.log('error', error));
    }
    return next(action);
}
