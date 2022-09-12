import React, { useEffect, useState } from 'react';
import { useSearchParams, } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Row, Pagination, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';

import RecipeCard from '../recipeCard/RecipeCard';
import './searchTag.css'

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
        recipes: state.recipe.recipesSearchResults,
        numberOfPages: state.recipe.numberOfPages,
    };
}
const mapDispatchToProps = (dispatch) => ({
    getRecipesByTags: ({ tags, page }) => dispatch(actions.getRecipesByTags({ tags, page })),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Home(props) {
    const { recipes, numberOfPages } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const { register, watch, setValue } = useForm();
    const tagsAllergy = watch("tagsFreeOf");
    const [pageNumber, setPageNumber] = useState(0)
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
            props.getRecipesByTags({ tags, page })
        } else {
            tagsAllergy ? tags = tagsAllergy : tags = '';
            pageNumber ? page = parseInt(pageNumber) : page = 0;
            page = pageNumber;
            setSearchParams({ tags, page })
            props.getRecipesByTags({ tags, page })
        }
    }, [pageNumber, tagsAllergy])

    useEffect(() => {
        if (numberOfPages < pageNumber + 1) {
            setPageNumber(0)
        }
    }, [numberOfPages])


    /*  useEffect(() => {
         if (pageNumber && tagsAllergy === null) {
             setSearchParams({ tags: '', page: pageNumber })
         } else if (tagsAllergy && tagsAllergy.length >= 0) {
             let newTags = [...tagsAllergy];
             let tags = newTags.join(" ");
             setSearchParams({ tags, page: pageNumber })
         }
     }, [pageNumber, tagsAllergy])
  */
    /*     useEffect(() => {
            let page;
            let tags;
            if (searchParams && tagsAllergy === null) {
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
                props.getRecipesByTags({ tags, page })
            } else if (pageNumber && tagsAllergy === null) {
                tags = 0;
                page = pageNumber;
                setSearchParams({ tags: '', page: pageNumber })
                props.getRecipesByTags({ tags, page })
            } else if (tagsAllergy?.length >= 0) {
                let newTags = [...tagsAllergy];
                tags = newTags.join(" ");
                page = pageNumber;
                setSearchParams({ tags, page });
                props.getRecipesByTags({ tags, page })
    
            } else {
                page = 0;
                tags = '';
                props.getRecipesByTags({ tags, page })
            }
        }, [pageNumber, tagsAllergy, searchParams]) */

    /* useEffect(() => {
        if (searchParams) {
            let searchTags = searchParams.get('tags')
            let searchPage = searchParams.get('page')
            let page;
            let tags;
            
            searchPage ? page = parseInt(searchPage) : page = 0;
            if (searchTags) {
                tags = searchTags.split(" ");
                setValue("tagsFreeOf", tags)
            } else {
                tags = searchTags;
            }
            setValue("tagsFreeOf", tags)
            setPageNumber(page)
            props.getRecipesByTags({ tags, page })
        }
    }, [searchParams]) */

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
    /* const styles = {
        width: '5rem',
        border: "3px solid #feedc0c7"
    }; */

    return (
        <div className='bg-l'>
            <div className='text-center pt-3 bg-l2'>
                <div className='display-6 pb-1'>Eating with Food Allergies</div>
                <div>Show only recipes that are FREE of: <small> (select one or more)</small></div>
                {/* <p>chiose</p> */}
            </div>
            <div className='mb-3'>
                <div className='bg-l2 m-auto'>
                    <Row className="justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center">
                        <Col md="auto" className=''>
                            {allergyFood.map((item, index) => (
                                <label className="option_item mx-3 " key={index}>
                                    <input value={item.nameList} type="checkbox" className="checkbox"
                                        {...register("tagsFreeOf")}
                                    />
                                    <div className="option_inner" >
                                        <div className="tickmark">
                                            <div className="line"></div>
                                        </div>
                                        <div className="image">
                                            <img src={item.nameImage} className='styleImage rounded-circle mx-3 my-1 img-fluid' />
                                        </div>
                                        <div className="name mb-3">{item.nameWrite}</div>
                                    </div>
                                </label>

                            ))}
                        </Col>
                    </Row>
                </div>
                {recipes.length > 0 ?
                    <>
                        <div className='m-5' >
                            <div className='m-auto'>
                                <Row className="justify-content-md-center m-5">
                                    {recipes.length > 0 &&
                                        recipes.map(recipeItem => {
                                            return (
                                                <RecipeCard
                                                    key={recipeItem._id}
                                                    recipeItem={recipeItem}
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
                    </>
                    :
                    <div className='bg-l2 bb m-auto text-center pt-4'>
                        <p>Sorry, we couldn't find any matches..</p>
                    </div>
                }
            </div>
        </div>
    );
})