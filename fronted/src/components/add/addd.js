import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';
import RecipeCard from '../home/RecipeCard'
import { Row } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        recipes: state.public.recipes,
        nameState: state.recipe.nameState
    };
}
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(function Addd(props) {

    const [pageNumber, setPageNumber] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [recipes, setRecipes] = useState([])

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i)

    useEffect(() => {
        fetch(`http://localhost:5001/recipes?page=0${pageNumber}`)
            .then((response) => response.json())
            .then(({ recipes, total }) => {
                console.log(recipes);
                setRecipes(recipes);
                setNumberOfPages(total)
            })

    }, [pageNumber])

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    }

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    }

    return (
        <div>
            <div className='App'>
                <h3 className='mb-5'>Page of {pageNumber + 1}</h3>

                <div className='mt-5'>
                    <div className='m-auto'>
                        <Row className="justify-content-md-center">
                            {recipes.length > 0 &&
                                recipes.map(recip => {
                                    return (
                                        <RecipeCard key={recip._id} recip={recip} />
                                    )
                                })
                            }
                        </Row>
                    </div>
                </div>


                <button onClick={gotoPrevious}>prev</button>
                {
                    pages.map(pageIndex => (
                        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
                    ))
                }
                <button onClick={gotoNext}>next</button>
            </div>


            {/* {console.log(props.recipes[2])} */}
        </div>
    )
}
)

{/*    {recipes.map(recipe => {
                    return (
                        <div key={recipe._id}>
                            <h4> {recipe.nameRecipe}</h4>
                            <p> {recipe.recipe.description}</p>
                        </div>
                    )
                })} */}