import React from 'react'
import { Button, Card, Col } from 'react-bootstrap';


export default function RecipeCard(props) {
    const { recip } = props;
    const { tagsFreeOf } = recip;
    return (
        <Col md="auto" className='m-5'>
            <Card style={{ width: '18rem',height:'18rem' }}>
                <Card.Img variant="top" src={recip.recipeImage} style={{ width: '18rem', height: '18rem' }} />
                <Card.Body>
                    <Card.Title>{recip.nameRecipe}</Card.Title>
                    <Card.Text>
                        free of: 
                        {tagsFreeOf.map(tag => (
                            <span key={tag}>{tag},</span>
                        ))}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
