import React, { useState } from 'react'
import { Card, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './recpieCard.css'
import tags from '../../../images/tags.png'


export default function RecipeCard(props) {
    const { recipeItem } = props;
    const { tagsFreeOf } = recipeItem;

    const [favs, setFavs] = useState([])

    // const { card, onHandleFavs, favs } = props;
    function onHandleFavs() {
        let id = recipeItem._id
        let newFavs = [...favs];
        if (favs.includes(id)) {
            console.log('h');
            newFavs.splice(favs.indexOf(id), 1);
            setFavs(newFavs)
        } else {
            console.log('5');
            let f = [newFavs, id]
            setFavs(f)
        }
    };

    function buttonClass(id) {
        let classes = "hoverIcon save bi";
        classes += favs.includes(id) ? " bi-heart-fill" : " bi-heart";
        return classes;
    }

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
                {/*  <div className='box'>
                    {recipeItem.title}
                </div> */}
                <Link to={`/recpies/${recipeItem._id}`} className="cancelLinkStyle">
                    <div className='box'>
                        {recipeItem.title}
                    </div>
                </Link>

                <span className="float-right save hoverIcon">
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
