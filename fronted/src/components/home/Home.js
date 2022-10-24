import React, { useEffect, useState } from 'react';
import { useSearchParams, } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions/action';
import Row from 'react-bootstrap/Row';

import RecipeCard from './recipeCard/RecipeCard';
import PaginationPage from './Pagination/PaginationPage';
import SearchTags from './search/SearchTags';


export default function Home() {
    const arrayFavorites = useSelector(state => state.favorite.arrayFavorites)
    const myFavorites = useSelector(state => state.favorite.myFavorites)
    const userId = useSelector(state => state.user.userId)
    const recipes = useSelector(state => state.recipe.recipesSearchResults)
    const numberOfPages = useSelector(state => state.recipe.numberOfPages)
    const dispatch = useDispatch()

    const [pageNumber, setPageNumber] = useState(0)
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i)
    const [searchParams, setSearchParams] = useSearchParams();
    const { register, watch, setValue } = useForm();
    const tagsAllergy = watch("tagsFreeOf");

    function onHandleFavs(id) {
        console.log(id);
        dispatch(actions.addFavorite(id))
    };
    useEffect(() => {

    }, [])
    /*  useEffect(() => {
         if (userId) {
             dispatch(actions.getArrayFavorite())
         }
     }, [userId]) */

    useEffect(() => {
        let tags;
        let page;
        if (searchParams && !tagsAllergy && pageNumber === 0) {
            let searchTags = searchParams.get('tags');
            let searchPage = searchParams.get('page');
            searchPage ? page = parseInt(searchPage) : page = 0;
            if (searchTags) {
                tags = searchTags.split(" ");
                setValue("tagsFreeOf", tags)
            } else {
                tags = searchTags;
            }
            setValue("tagsFreeOf", tags)
            setPageNumber(page)
            dispatch(actions.getRecipesByTags({ tags, page }))
        } else {
            pageNumber ? page = parseInt(pageNumber) : page = 0;
            // page = pageNumber;
            // tagsAllergy ? tags = tagsAllergy : tags = '' ;

            if (tagsAllergy) {
                tags = [...tagsAllergy]
                let newTags = [...tagsAllergy];
                let tagsString = newTags.join(" ");
                setSearchParams({ tags: tagsString, page })
            } else {
                tags = ''
                setSearchParams({ tags, page })
            }

            // setSearchParams({ tags, page })
            dispatch(actions.getRecipesByTags({ tags, page }))
        }
    }, [pageNumber, tagsAllergy])

    useEffect(() => {
        if (numberOfPages < pageNumber + 1) {
            setPageNumber(0)
        }
    }, [numberOfPages])

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
        (pageIndex === pageNumber) ? "active" : "noneActive"
    ]

    return (
        <div className='bg-l'>
            <div className='text-center pt-3 bg-l2'>
                <div className='display-6 pb-1'>Eating with Food Allergies</div>
                <div>Show only recipes that are FREE of: <small> (select one or more)</small></div>
            </div>
            <div className='mb-3'>

                <SearchTags register={register} />

                {recipes.length > 0 ?
                    <>
                        <Row className="justify-content-md-center m-5">
                            {recipes.length > 0 &&
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
                        <PaginationPage
                            gotoPrevious={gotoPrevious}
                            gotoNext={gotoNext}
                            gotoStart={gotoStart}
                            gotoEnd={gotoEnd}
                            active={active}
                            pages={pages}
                            setPageNumber={setPageNumber}
                        />
                    </>
                    :
                    <div className='bg-l2 bb m-auto text-center pt-4'>
                        <p>Sorry, we couldn't find any matches..</p>
                    </div>
                }
            </div>
        </div>
    );
}