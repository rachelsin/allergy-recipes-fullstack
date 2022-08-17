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
        historySearch: state.recipe.historySearch,
    };
}
const mapDispatchToProps = (dispatch) => ({
    getRecipesByTags: ({ checked, pageNumber }) => dispatch(actions.getRecipesByTags({ checked, pageNumber })),
    setSearch: ({ checked, pageNumber }) => dispatch(actions.setSearch({ pageNumber, checked })),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Home(props) {
    const { recipes, numberOfPages, historySearch } = props;

    const [checked, setChecked] = useState([]);
    const [pageNumber, setPageNumber] = useState(0)
    const [myHistorySearch, setMyHistorySearch] = useState(historySearch)

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i)

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



    // const checkList = ["milk", "peanut", "egg", "soy", "tree nut", "wheat", "sesame", "fish"];
    // const [numberOfPages, setNumberOfPages] = useState(0)
    // const [recipes, setRecipes] = useState([])


    /*    useEffect(() => {
           // let updatedList = [...checked];
           if (myHistorySearch !== null) {
               // updatedList = [...checked, myHistorySearch.tagsFreeOf];
               setChecked(checked.concat(myHistorySearch.tagsFreeOf))
               setPageNumber(myHistorySearch.pageIndex)
               console.log('test');
               setMyHistorySearch(null)
               props.getRecipesByTags({ checked, pageNumber })
           } else {
               props.getRecipesByTags({ checked, pageNumber })
           }
   
       }, [checked, pageNumber]) */

    useEffect(() => {
        if (myHistorySearch !== null) {
            setChecked(checked.concat(myHistorySearch.tagsFreeOf))
            setPageNumber(myHistorySearch.pageIndex)
            setMyHistorySearch(null)
        }
    }, [])

    useEffect(() => {
        if (myHistorySearch === null) {
            props.getRecipesByTags({ checked, pageNumber })
        }
    }, [checked, pageNumber])

    useEffect(() => {
        props.setSearch({ checked, pageNumber })
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
    const active = (pageIndex) => [
        ((pageIndex + 1) === pageNumber + 1) ? "active" : "noneActive"
    ]

    const checkIf = (name) => {
        if (historySearch !== null) {
            if (checked.includes(name)) {
                return true
            } else {
                return false
            }
        }
    }
    return (
        <>
            <div className='App'>
                <div className='mb-3'>
                    <div className='row bg-l '>
                        <div className='col-12'>
                            {/* <SearchTags /> */}
                            <SearchTagImage
                                checked={checked}
                                setChecked={setChecked}
                                allergyFood={allergyFood}
                                myHistorySearch={myHistorySearch}
                                setMyHistorySearch={setMyHistorySearch}
                                checkIf={checkIf}
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
                    <div className='m-5'>
                        <div className='m-auto'>
                            <Row className="justify-content-md-center m-5">
                                {recipes.length > 0 &&
                                    recipes.map(recip => {
                                        return (
                                            <RecipeCard
                                                key={recip._id}
                                                recip={recip}
                                            // checked={checked}
                                            // pageNumber={pageNumber}
                                            />
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </div>
                    <nav aria-label="Page navigation example mt-5">
                        <ul className="pagination justify-content-center mt-5">
                            <Pagination.First onClick={gotoStart} />
                            <Pagination.Prev onClick={gotoPrevious} />
                            {pages.map(pageIndex => (
                                <Pagination.Item
                                    className={active(pageIndex)}
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
