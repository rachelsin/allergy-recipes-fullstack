import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';
import { Row, Pagination } from 'react-bootstrap';

import RecipeCard from './RecipeCard';
import Tags from '../createRecipe/Tags';
import SearchTags from '../search/SearchTags';
import SearchTagImage from '../search/SearchTagImage';

import eggs from '../../images/eggs.png'
import fish from '../../images/fish.png'
import milk from '../../images/milk.png'
import nuts from '../../images/nuts.png'
import peanuts from '../../images/peanuts.png'
import sesame from '../../images/sesame.png'
import soya from '../../images/soya.png'
import wheat from '../../images/wheat.png'


const mapStateToProps = (state) => {
    return {
        recipes: state.recipe.recipesA,
        numberOfPages: state.recipe.numberOfPages,
    };
}
const mapDispatchToProps = (dispatch) => ({
    // getNewRecipes: (pageNumber) => dispatch(actions.getNewRecipes(pageNumber)),
    getRecipesByTags: ({ checked, pageNumber }) => dispatch(actions.getRecipesByTags({ checked, pageNumber })),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Home(props) {

    const [checked, setChecked] = useState([]);
    const checkList = ["milk", "peanut", "egg", "soy", "tree nut", "wheat", "sesame", "fish"];
    const allergyFood = [
        { nameList: "milk", nameImage: milk, nameWrite: "Milk" },
        { nameList: "peanut", nameImage: peanuts, nameWrite: "Peanut" },
        { nameList: "egg", nameImage: eggs, nameWrite: "Egg" },
        { nameList: "soy", nameImage: soya, nameWrite: "Soya" },
        { nameList: "nuts", nameImage: nuts, nameWrite: "Nuts" },
        { nameList: "wheat", nameImage: wheat, nameWrite: "Wheat" },
        { nameList: "sesame", nameImage: sesame, nameWrite: "Sesame" },
        { nameList: "fish", nameImage: fish, nameWrite: "Fish" },
    ]

    const { recipes, numberOfPages } = props;

    const [pageNumber, setPageNumber] = useState(0)
    // const [numberOfPages, setNumberOfPages] = useState(0)
    // const [recipes, setRecipes] = useState([])

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i)

    /*  useEffect(() => {
         props.getNewRecipes(pageNumber)
 
     }, [pageNumber]) */

    useEffect(() => {
        props.getRecipesByTags({ checked, pageNumber })

    }, [checked, pageNumber])

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
                    {/* <h3 className='mb-5'>Page of {pageNumber + 1}</h3> */}
                    <div className='row bg-l '>
                        <div className='col-12'>
                            {/* <SearchTags /> */}
                            <SearchTagImage
                                checked={checked}
                                setChecked={setChecked}
                                allergyFood={allergyFood}
                            />
                        </div>
                    </div>
                    {/* <div className='row border'>

                         <div className='col'>
                            <Tags checked={checked}
                                setChecked={setChecked}
                                checkList={checkList} />
                        </div>
                    </div> */}
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
