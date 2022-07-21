import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';
import RecipeCard from '../home/RecipeCard'
import { Row, Pagination } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        recipes: state.recipe.recipesA,
        numberOfPages: state.recipe.numberOfPages,
        nameState: state.recipe.nameState
    };
}
const mapDispatchToProps = (dispatch) => ({
    getNewRecipes: (pageNumber) => dispatch(actions.getNewRecipes(pageNumber)),

})

export default connect(mapStateToProps, mapDispatchToProps)(function Add(props) {

    const { recipes, numberOfPages } = props;

    const [pageNumber, setPageNumber] = useState(0)
    // const [numberOfPages, setNumberOfPages] = useState(0)
    // const [recipes, setRecipes] = useState([])

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i)

    useEffect(() => {
        props.getNewRecipes(pageNumber)

    }, [pageNumber])

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    }

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    }
    const gotoStart = () => {
        setPageNumber(0);
    }
    const gotoEnd = () => {
        setPageNumber(numberOfPages - 1);
    }

    return (
        <>
            <div className='App'>
                <div className='mb-3'>
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
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <Pagination.First onClick={gotoStart} />
                            <Pagination.Prev onClick={gotoPrevious} />
                            {pages.map(pageIndex => (
                                <Pagination.Item
                                    key={pageIndex}
                                    onClick={() => setPageNumber(pageIndex)}>
                                    {pageIndex + 1}
                                </Pagination.Item>

                            ))}
                            {/*   {
                                pages.map(pageIndex => (
                                    <li className='page-item' key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                                        <a className="page-link" style={{ cursor: "pointer" }}>{pageIndex + 1}</a>
                                    </li>
                                ))
                            } */}
                            <Pagination.Next onClick={gotoNext} />
                            <Pagination.Last onClick={gotoEnd} />

                        </ul>
                    </nav>
                </div>


            </div>

        </>
    )
}
)
