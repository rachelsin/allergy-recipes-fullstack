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
        recipes: state.recipe.recipesA,
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

    useEffect(() => {
        if (numberOfPages < pageNumber + 1) {
            setPageNumber(0)
        }
    }, [numberOfPages])

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
        if (tagsAllergy) {
            let newTags = [...tagsAllergy];
            let tags = newTags.join(" ");
            setSearchParams({ tags, page: pageNumber || 0 })
        } else if (pageNumber >= 0) {
            setSearchParams({ tags: "", page: pageNumber || 0 })
        }
    }, [pageNumber, tagsAllergy])

    useEffect(() => {
        if (searchParams) {
            let searchTags = searchParams.get('tags')
            let searchPage = searchParams.get('page')

            let page;
            if (searchPage) {
                page = parseInt(searchPage)
            } else {
                page = 0;
            }

            let tags;
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
    }, [searchParams])

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
    const styles = {
        width: '5rem',
        border: "3px solid #feedc0c7"
    };

    return (
        <div className='bg-l'>
            <div className='mb-3'>
                <div className='bg-l2 bb m-auto'>
                    <Row className="justify-content-md-center">
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
                                            <img src={item.nameImage} style={styles} className='rounded-circle mx-3 my-1' />
                                        </div>
                                        <div className="name mb-3">{item.nameWrite}</div>
                                    </div>
                                </label>

                            ))}
                        </Col>
                    </Row>
                </div>
                {recipes.length > 1 ?
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
                        <p>soory, but no found recipe...</p>
                    </div>
                }
            </div>
        </div>
    );
})