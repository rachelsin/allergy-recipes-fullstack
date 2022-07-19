import { actions } from "../actions/action";

export const userCrud = ({ dispatch, getState }) => next => action => {
    const myHeaders = new Headers();

    if (action.type === 'SIGNUP') {
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(action.payload),
            redirect: 'follow'
        };

        fetch("http://localhost:5001/signup", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    if (action.type === 'LOGIN') {
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(action.payload),
            redirect: 'follow'
        };
        fetch("http://localhost:5001/login", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem("token", data.token);
            })
            .catch(err => console.log('error:', err));
    }
   /*  if (action.type === 'ADD_RECIPE') {
        myHeaders.append("Content-Type", "application/json");
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
    } */

    return next(action);
}
