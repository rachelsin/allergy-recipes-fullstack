import React, { useEffect, useState } from 'react'
import { useSearchParams, } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import { Row, Pagination } from 'react-bootstrap';

import RecipeCard from '../RecipeCard';
import SearchTagImage from './SearchTagImage';

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
    getRecipesByTags: ({ arrTags, pageParseInt }) => dispatch(actions.getRecipesByTags({ arrTags, pageParseInt })),
    setSearch: ({ checked, pageNumber }) => dispatch(actions.setSearch({ pageNumber, checked })),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Testsearch(props) {
    const { recipes, numberOfPages, historySearch } = props;

    const [searchParams, setSearchParams] = useSearchParams()

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
    useEffect(() => {
        const tags = checked.join(" ")
        setSearchParams({ tags: tags, page: pageNumber })
    }, [checked, pageNumber])

    useEffect(() => {
        let searchTags = searchParams.get('tags');
        let searchPage = searchParams.get('page');
        let arrTags = searchTags.split(" ")
        let pageParseInt = parseInt(searchPage);
        console.log(arrTags, pageParseInt)
        // if (myHistorySearch === null) {
        props.getRecipesByTags({ arrTags, pageParseInt })
        // const tags = checked.join(" ")
        // setSearchParams({ tags: tags, page: pageNumber })
        // }
    }, [searchParams])

    // useEffect(() => {
    //     if (myHistorySearch !== null) {
    //         setChecked(checked.concat(myHistorySearch.tagsFreeOf))
    //         setPageNumber(myHistorySearch.pageIndex)
    //         setMyHistorySearch(null)
    //     }
    // }, [])

    /*  useEffect(() => {
         if (myHistorySearch === null) {
         props.getRecipesByTags({ checked, pageNumber })
         const tags = checked.join(" ")
         setSearchParams({ tags: tags, page: pageNumber })
         }
     }, [checked, pageNumber]) */

   /*  useEffect(() => {
        props.setSearch({ checked, pageNumber })
    }, [checked, pageNumber]) */

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
            <div className='bg-l'>
                <div className='mb-3'>


                    <div className='bg-l2 bb m-auto'>
                        <Row className="justify-content-md-center">
                            {/* <SearchTags /> */}
                            <SearchTagImage
                                checked={checked}
                                setChecked={setChecked}
                                allergyFood={allergyFood}
                                myHistorySearch={myHistorySearch}
                                setMyHistorySearch={setMyHistorySearch}
                                checkIf={checkIf}
                            />
                        </Row>
                    </div>
                    {/* <div className='row border'>

                         <div className='col'>
                            <Tags checked={checked}
                                setChecked={setChecked}
                                checkList={checkList} />
                        </div>
                    </div> */}
                    <div className='m-5 ' >
                        <div className='m-auto'>
                            <Row className="justify-content-md-center m-5">
                                {recipes.length > 0 &&
                                    recipes.map(recipeItem => {
                                        return (
                                            <RecipeCard
                                                key={recipeItem._id}
                                                recipeItem={recipeItem}
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
