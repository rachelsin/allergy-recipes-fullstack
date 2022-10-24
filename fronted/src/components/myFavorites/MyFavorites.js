import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions/action';
import RecipeCard from '../home/recipeCard/RecipeCard'

export default function MyFavorites() {
    const myFavorites = useSelector(state => state.favorite.myFavorites)

    const recipes = useSelector(state => state.favorite.myRecipesFavorites)
    const userId = useSelector(state => state.user.userId)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('h');
        if (userId) {
            dispatch(actions.getMyRecipesFavorites())
            console.log(userId);
        }

    }, [userId, myFavorites])

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
                <h4 className='mx-5 ' ><i className="bi bi-arrow-left hoverIcon" onClick={handleGoBack} role="button"></i><span className='display-6'> My Favorites Recipes</span></h4>
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
