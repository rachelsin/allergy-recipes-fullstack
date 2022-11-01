import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions/action';
import RecipeCard from '../home/recipeCard/RecipeCard'

export default function MyRecipes() {
    const arrayFavorites = useSelector(state => state.favorite.arrayFavorites)
    const myFavorites = useSelector(state => state.favorite.myFavorites)


    const recipes = useSelector(state => state.recipe.myRecipe.recipes)
    const userId = useSelector(state => state.user.userId)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userId) {
            dispatch(actions.getMyRecipes())
        }
    }, [userId])

    function onHandleFavs(id) {
        dispatch(actions.addFavorite(id))
    };


    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className="divBackground" >
            <div className='backgroundInDiv'>
                <h4 className='mx-5 ' ><i className="bi bi-arrow-left hoverIcon" onClick={handleGoBack} role="button"></i><span className='display-6'> My recipes</span></h4>
                <div>
                    <Row className="justify-content-md-center m-5">
                        {recipes &&
                            recipes.map(recipeItem => {
                                return (
                                    <RecipeCard
                                        key={recipeItem._id}
                                        recipeItem={recipeItem}
                                        onHandleFavs={() => onHandleFavs(recipeItem._id)}
                                        myFavorites={myFavorites}
                                    />
                                )
                            })
                        }
                    </Row>
                </div>

            </div>
        </div>
    )
}
