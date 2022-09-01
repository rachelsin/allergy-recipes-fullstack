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
            .then(result => {
                console.log('result', result);
                dispatch(actions.setSucceededSignup(true))
            })
            .catch(error => {
                console.log('error', error);
                dispatch(actions.setSucceededSignup(false))
            });
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
                localStorage.setItem("token", data.token);
                console.log(data.cheackSign);
                dispatch(actions.setUser(data.cheackSign));
            })
            .catch(err => console.log('error:', err));
    }
    return next(action);
}
