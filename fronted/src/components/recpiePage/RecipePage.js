import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions/action';
import { Link } from "react-router-dom";
import './recipePage.css'
import DeleteRecipe from '../deleteRecipe/DeleteRecipe';

export default function RecipePage() {
    const recipe = useSelector(state => state.recipe.selectedRecipe)
    const myRecipes = useSelector(state => state.recipe.myRecipe.recipes)
    const myRecipesArray = myRecipes.map((i) => i._id)
    useEffect(() => {
        if (recipe && myRecipesArray && myRecipesArray.includes(recipe._id)) {
            setMyRecipe(true)
        } else {
            setMyRecipe(false)
        }
    }, [recipe, myRecipesArray])

    const dispatch = useDispatch()
    const [myRecipe, setMyRecipe] = useState()

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(actions.getRecipeById(id))
        }
    }, [id])

    const handleGoBack = () => {
        navigate(-1)
    }

    function checkImage() {
        let image = recipe?.image
        let result = image.startsWith('http')
        if (result) {
            return image;
        } else {
            return `http://localhost:5001/${image}`;
        }
    }

    function formatDate(date) {
        const currentMonth = date.getMonth() + 1;
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${dateString}/${monthString}/${date.getFullYear()}`;
    }
    const [show, setShow] = useState(false);
    const [userme, setUserme] = useState();

    function handleShow(id) {
        setUserme(id)
        setShow(true);
    }

    return (
        <>
            {(recipe !== null) ?
                <div className='divBackground'>
                    <div className='backgroundInDiv'>
                        <div className='mb-5'>
                            <span role="button" onClick={handleGoBack} className='float-start mx-5'><i className="bi bi-arrow-left"></i>Go back</span>
                            {myRecipe &&
                                <span className='float-end mx-5'>
                                    <Link to={`/my-recipes/edit/${recipe._id}`}>
                                        <span className='hoverIcon mx-1'>
                                            <i className="bi bi-pencil px-1" onClick="">Edit</i>
                                        </span>
                                    </Link>
                                    <span className='hoverIcon'>
                                        <i
                                            className="bi bi-trash3 px-1"
                                            onClick={() => handleShow(recipe._id)}
                                        >Delete</i>
                                    </span>
                                </span>
                            }
                            {
                                show ? <DeleteRecipe id={recipe._id} show={setShow} /> : null
                            }
                        </div>
                        {myRecipe &&
                            <div className='modal-footer'></div>
                        }
                        <div className="mb-3 mx-5" >
                            <div className="row g-0">
                                <div className="col-md-5">
                                    <img src={checkImage()} className="img-fluid borderRadius" alt=" recipe image" />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title display-6">
                                            {recipe?.title}
                                        </h5>
                                        <p>
                                            <small className='text-muted'>
                                                <i className="bi bi-calendar4 px-1"></i>
                                                {formatDate(new Date(recipe.date))}
                                            </small>
                                        </p>
                                        <p className="card-text text-muted">
                                            {recipe?.description}
                                        </p>
                                        <p className="card-text">Free of: </p>
                                        <div className=''>
                                            {recipe?.tagsFreeOf.map(tag => (
                                                <span className="border-end border-start border-dark px-1 bgFreeOf"> {tag} </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='mt-5 col-md-10'>
                                    <h4>Ingredients</h4>
                                    <table className='table table-striped'>
                                        <tbody>
                                            {recipe?.ingredients.map(ingredient => (
                                                <tr>
                                                    <td>{ingredient.qty} {ingredient.measurement} {ingredient.ingredient}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='my-5 col-md-10'>
                                    <h4 className=''>preparation</h4>
                                    <div className='bgPreparation mt-2 p-2'>
                                        <ol className="list-group list-group-numbered">
                                            {recipe?.preparation.map(item => (
                                                <li className='list-group-item'>{item}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    )
}
