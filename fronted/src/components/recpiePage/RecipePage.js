import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';

import './recipePage.css'

const mapStateToProps = (state) => {
    return {
        // recpie_id: state.recipe.recpieId,
        recipe: state.recipe.selectedRecipe,
    };
}
const mapDispatchToProps = (dispatch) => ({
    // getRecipeId: (recpieId) => dispatch(actions.getRecipeId(recpieId)),
    // getRecipeById: (recpie_id) => dispatch(actions.getRecipeById(recpie_id)),
    getRecipeById: (id) => dispatch(actions.getRecipeById(id)),

})

export default connect(mapStateToProps, mapDispatchToProps)(function RecipePage(props) {
    const { recipe } = props;
    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined) {
            props.getRecipeById(id);
        }
    }, [id])

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <>
            {(recipe !== null) ?
                <div className='divBackground'>
                    <div className='backgroundInDiv'>
                        <div className='mb-5'>
                            <p className='mx-5' role="button" onClick={handleGoBack}><i className="bi bi-arrow-left"></i> Go back</p>
                        </div>
                        <div className="mb-3 mx-5" >
                            <div className="row g-0">
                                <div className="col-md-5 bR8">
                                    <img src={recipe.recpie.recipeImage} className="img-fluid borderRadius" alt="..." />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <p><small><i className="bi bi-person-circle"></i> rachel@gmail.com</small></p>
                                        <h5 className="card-title display-6">{recipe.recpie.nameRecipe}</h5>


                                        <p className="card-text text-muted">
                                            {recipe.recpie.description}
                                        </p>
                                        <p className="card-text">Free of: </p>
                                        <div className=''>
                                            {recipe.recpie.tagsFreeOf.map(tag => (
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
                                            {recipe.recpie.ingredients.map(ingredient => (
                                                <tr>
                                                    <td>{ingredient.qty} {ingredient.measurement} {ingredient.ingredient}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='my-5 col-md-10'>
                                    <h4 className=''>preparation</h4>
                                    <div className='bgPreparation mt-3 px-2 py-3  '>
                                        {recipe.recpie.preparation.map(item => (
                                            <p >{item}</p>
                                        ))}
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
)