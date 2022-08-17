import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';

const mapStateToProps = (state) => {
    return {
        recpie_id: state.recipe.recpieId,
        recipe: state.recipe.r,
        search: state.recipe.search

    };
}
const mapDispatchToProps = (dispatch) => ({
    getRecipeId: (recpieId) => dispatch(actions.getRecipeId(recpieId)),
    getRecipeById: (recpie_id) => dispatch(actions.getRecipeById(recpie_id)),
    setHistorySearch: (search) => dispatch(actions.setHistorySearch(search)),

})

export default connect(mapStateToProps, mapDispatchToProps)(function RecipePage(props) {
    const { recpie_id, recipe, search } = props;
    const { id } = useParams();
    console.log(recipe, recpie_id);
    console.log(search);

    useEffect(() => {
        if (id !== undefined) {
            props.getRecipeId(id);
        }
    }, [id])
    useEffect(() => {
        if (recpie_id !== undefined) {
            props.getRecipeById(recpie_id);
        }
    }, [recpie_id])

    useEffect(() => {
        props.setHistorySearch(search);
    }, [])


    return (
        <div>
            <p>ss</p>
            {(recipe !== null) ?
                <>
                    <h1>{recipe.recpie.nameRecipe}</h1>
                    <p>{recipe.recpie.tagsFreeOf}</p>
                    <p>{recipe.recpie.decription}</p>
                    <img src={recipe.recpie.recipeImage}></img>
                </>
                : null
            }


        </div>
    )
}
)