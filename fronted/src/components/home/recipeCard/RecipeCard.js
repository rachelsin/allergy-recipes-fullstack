import React from 'react'
import { Card, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './recpieCard.css'
import tags from '../../../images/tags.png'


export default function RecipeCard(props) {
    const { recipeItem } = props;
    const { tagsFreeOf } = recipeItem;

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
                <Link to={`/recpies/${recipeItem._id}`} className="cancelLinkStyle">
                    <div className='tagsContainer'>
                        {tagsFreeOf.map(tag => (
                            <div className='imageNum1 mb-2'>
                                <img src={tags} className="imageTag"></img>
                                <span className='textTag'>{tag} free </span>
                            </div>
                        ))}
                    </div>
                    
                    <Card.Img
                        variant="top"
                        src={checkImage()}
                        className="imgCard"
                    />
                    <div className='box'>
                        {recipeItem.title}
                    </div>
                </Link>
            </Card>
        </Col>
    )
}
