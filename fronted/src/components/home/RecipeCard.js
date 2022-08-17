import React from 'react'
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './recpieCard.css'


export default function RecipeCard(props) {
    const { recip } = props;
    const { tagsFreeOf } = recip;
    return (
        <Col md="auto" className='m-4'>
            <Card style={{ width: '18rem', height: '14rem' }} className="clickMe">
                <Link to={`/recpies/${recip._id}`} className="noneLink">
                    <span>free of:
                        {tagsFreeOf.map(tag => (
                            <span key={tag}>{tag},</span>
                        ))}</span>

                    <Card.Img variant="top" src={recip.recipeImage} style={{ width: '18rem', height: '14rem' }} />
                    <div className='box'>
                        {recip.nameRecipe}
                    </div>
                </Link>
            </Card>
        </Col>
    )
}
