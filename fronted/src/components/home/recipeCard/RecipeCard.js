import React, { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './recpieCard.css'
import tags from '../../../images/tags.png'
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/actions/action';


export default function RecipeCard({ recipeItem, onHandleFavs, myFavorites }) {
    // const { recipeItem } = props;
    const { tagsFreeOf } = recipeItem;

    const [favs, setFavs] = useState([])
    const [click, setClick] = useState()

    function buttonClass(id) {
        // if (myFavorites) {
        // console.log(myFavorites);
        let classes = "bi";
        classes += myFavorites.includes(id) ? " bi-heart-fill" : " bi-heart";
        return classes;
        // }
    }
    /* function buttonClass(id) {
        // console.log(id);
        let classes = "bi";
        classes += arrayFavorites.includes(id) ? " bi-heart-fill" : " bi-heart";
        return classes;
    } */


    function checkImage() {
        let image = recipeItem.image
        let result = image.startsWith('http')
        if (result) {
            return image;
        } else {
            return `http://localhost:5001/${image}`;
        }
    }

    return (
        <Col md="auto" className='m-4 mb-5' key={recipeItem._id}>
            <Card
                className="clickMe cancelLinkStyle"
                key={recipeItem._id}
            >

                <div className='tagsContainer'>
                    {tagsFreeOf.map(tag => (
                        <div className='imageNum1 mb-2'>
                            <img src={tags} className="imageTag"></img>
                            <span className='textTag'>{tag} free </span>
                        </div>
                    ))}
                </div>
                <Link to={`/recpies/${recipeItem._id}`} className="cancelLinkStyle">
                    <Card.Img
                        variant="top"
                        src={checkImage()}
                        className="imgCard"
                    />
                </Link>
                <div className='box'>
                    {recipeItem.title}
                </div>
                <span className="float-right">
                    <i
                        onClick={onHandleFavs}
                        className={buttonClass(recipeItem._id)}
                    >
                    </i>
                </span>

            </Card>
        </Col>
    )
}
