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
    // const { recpie_id, recipe } = props;
    const { recipe } = props;
    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined) {
            props.getRecipeById(id);
        }
    }, [id])
    /*  useEffect(() => {
         if (recpie_id !== undefined) {
             props.getRecipeById(recpie_id);
         }
     }, [recpie_id]) */

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <>
            {(recipe !== null) ?
                <div className='divBackground'>
                    <div className='backgroundInDiv'>
                        <p className='mx-5' role="button" onClick={handleGoBack}><i className="bi bi-arrow-left"></i> Go back</p>
                        <div className='divRecipe'>
                            <div className='upRecipe'>
                                <div className='imageRecipe'>
                                    <img src={recipe.recpie.recipeImage} className="img-fluid rounded-start bR8" />
                                </div>
                                <div className='titleAndDescription'>
                                    <h3 className='display-5'>{recipe.recpie.nameRecipe}</h3>
                                    <div className=''>
                                        <div className='m-3'>
                                            <span>Free of: </span>
                                            <div className='row mt-3'>
                                                {recipe.recpie.tagsFreeOf.map(tag => (
                                                    <p className='col-3 bgc text-center'>{tag} </p>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>Ingredients</h4>
                                {recipe.recpie.ingredients.map(ingredient => (
                                    <div>
                                        <p>{ingredient.qty} {ingredient.measurement} {ingredient.ingredient}</p>
                                    </div>
                                ))}
                                <h4>preparation</h4>
                                {recipe.recpie.preparation.map(item => (
                                    <div>
                                        <p>{item}</p>
                                    </div>
                                ))}
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