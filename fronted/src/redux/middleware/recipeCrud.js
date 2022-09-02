import { actions } from "../actions/action";
import localStorageFunction from "../../services/localStorage";

export const recipeCrud = ({ dispatch, getState }) => next => action => {
    const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    /*  if (action.type === 'ADD_RECIPE') {
         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
 
         let formdata = new FormData();
         formdata.append("nameRecipe", action.payload.nameRecipe);
         formdata.append("tagsFreeOf", action.payload.tagsFreeOf);
         formdata.append("description", action.payload.description);
         formdata.append("ingredients", action.payload.ingredients);
         formdata.append("preparation", action.payload.preparation);
         // formdata.append("user_id", getState().user.user.id);
         formdata.append("recipeImage", action.payload.recipeImage);
 
         const requestOptions = {
             method: 'POST',
             headers: myHeaders,
             body: formdata,
             redirect: 'follow'
         };
 
         fetch("http://localhost:5001/addRecipe", requestOptions)
             .then(response => response.json())
             .then(result => console.log(result))
             .catch(error => console.log('error', error));
         console.log(formdata);
     } */
    /*   if (action.type === 'ADD_RECIPE') {
          let raw = JSON.stringify({
              "nameRecipe": action.payload.nameRecipe,
              "tagsFreeOf": action.payload.tagsFreeOf,
              "description": action.payload.description,
              "ingredients": action.payload.ingredients,
              "preparation": action.payload.preparation,
              "recipeImage": action.payload.recipeImage,
              "user_id": getState().user.user.id
          });
  
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
      } */
    if (action.type === 'ADD_NEW_RECIPE') {
        const token = localStorageFunction.getJwt();
        myHeaders.append("x-auth-token", token);
        myHeaders.append("Content-Type", "application/json");

        // console.log(getState().user.userId);
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
    if (action.type === 'GET_ALL_RECIPES') {
        myHeaders.append("Content-Type", "application/json");
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
        /*  const myHeaders = new Headers();
         myHeaders.append("Content-Type", "application/json");
         let requestOptions = {
             method: 'GET',
             headers: myHeaders,
             redirect: 'follow'
         };
         const pageNumber = action.payload;
 
         fetch(`http://localhost:5001/recipes?page=0${pageNumber}`, requestOptions)
             .then((response) => response.json())
             .then((result) => {
                 dispatch(actions.setARecipes(result));
                 // dispatch(actions.setNumberOfPages(total));
             })
             .catch(error => console.log('error', error)); */
    }
    if (action.type === 'GET_RECIPES_BY_TAGS') {
        myHeaders.append("Content-Type", "application/json");
        // let requestOptions = {
        //     method: 'GET',
        //     redirect: 'follow'
        // };
        const { tags, page } = action.payload;
        console.log(action.payload);
        let searchString;
        if (tags === '' || typeof tags === 'undefined' || tags === null) {
            searchString = ""
            console.log(searchString);
        } else {
            searchString = tags.join('+');
            console.log('arr');
        }
        console.log(page);
        // console.log(searchString, pageNumber);
        fetch(`http://localhost:5001/recipes/search/?tags=${searchString}&page=0${page}`)

            /*  let x = `/?tags=${searchString}&page=0${pageNumber}` */
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                dispatch(actions.setARecipes(result));
                // dispatch(actions.setNumberOfPages(total));
            })
            .catch(error => console.log('error', error));
    }
    if (action.type === 'GET_RECIPE_BY_ID') {
        const { recpieId } = getState().recipe;
        fetch(`http://localhost:5001/recipe/${recpieId}`)
            .then(response => response.json())
            .then((result) => {
                console.log(result);
                console.log('yyyy');
                dispatch(actions.setR(result));
                // dispatch(actions.setNumberOfPages(total));
            })
            .catch(err => console.log('error:', err));
    }

    return next(action);
}
