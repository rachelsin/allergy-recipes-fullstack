import { actions } from "../actions/action";

export const recipeCrud = ({ dispatch, getState }) => next => action => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (action.type === 'ADD_RECIPE') {

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(action.payload),
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

    return next(action);
}
