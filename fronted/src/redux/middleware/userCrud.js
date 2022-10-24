import { actions } from "../actions/action";
import axios from "axios";

export const userCrud = ({ dispatch, getState }) => next => action => {
    const myHeaders = new Headers();

    if (action.type === 'SIGNUP') {
        const data = action.payload;

        const config = {
            method: 'post',
            url: 'http://localhost:5001/signup',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                console.log(response);
                dispatch(actions.setSucceededSignup(true))
                dispatch(actions.setStatusSignup(null))
            })
            .catch(error => {
                console.log(error);
                // dispatch(actions.setSucceededSignup(false))
                dispatch(actions.setStatusSignup(error.response.data))

            });
    }
    if (action.type === 'LOGIN') {
        const data = action.payload;

        const config = {
            method: 'post',
            url: 'http://localhost:5001/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                console.log(JSON.stringify(response.data.token));
                localStorage.setItem("token", response.data.token);
                dispatch(actions.setSucceededLogin(null));
                dispatch(actions.setStatusLogin(true));
            })
            .catch(error => {
                console.log(error.response.data);
                dispatch(actions.setSucceededLogin(error.response.data))

            });

    }
    /*  if (action.type === 'SIGNUP') {
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
                 console.log('2');
 
                 console.log('result', result);
                 dispatch(actions.setSucceededSignup(true))
             })
             .catch(error => {
                 console.log('3');
                 console.log('error', error);
                 dispatch(actions.setSucceededSignup(false))
             });
     } */
    /* if (action.type === 'LOGIN') {
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(action.payload),
            redirect: 'follow'
        };
        fetch("http://localhost:5001/login", requestOptions)
            .then(response => {
                response.json()
                console.log('errrrr1');
                console.log(response);
            }
            )
            .then(data => {
                console.log('errrrr2');
                console.log(data);

                // localStorage.setItem("token", data.token);
                // dispatch(actions.setSucceededLogin(null));
                dispatch(actions.setStatusLogin(true));
            })
            .catch(error => {
                console.log('errrrr3');
                // return Promise.reject()
                // const myJson = error.message
                console.log('error', error);
                dispatch(actions.setSucceededLogin('Invalid email or password.'))
            });
    } */

    return next(action);
}
