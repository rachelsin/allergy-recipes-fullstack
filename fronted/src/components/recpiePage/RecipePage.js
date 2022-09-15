import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions/action';

import './recipePage.css'

export default function RecipePage() {
    const recipe = useSelector(state => state.recipe.selectedRecipe)
    const dispatch = useDispatch()

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

    return (
        <>
            {(recipe !== null) ?
                <div className='divBackground'>
                    <div className='backgroundInDiv'>
                        <div className='mb-5'>
                            <p className='mx-5' role="button" onClick={handleGoBack}>
                                <i className="bi bi-arrow-left"></i>
                                Go back
                            </p>
                        </div>
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
