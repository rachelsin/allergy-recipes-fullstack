import React from 'react'
import { Button, Card, Col } from 'react-bootstrap';


export default function RecipeCard(props) {
    const { recip } = props;

    return (
        <Col md="auto" className='m-4'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={recip.recipeImage} />
                <Card.Body>
                    <Card.Title>{recip.nameRecipe}</Card.Title>
                    <Card.Text>
                        {/* free of:
                        <ul>
                            {recipe.tags.map(tag => {
                                <li>{tag}</li>
                            })}
                        </ul> */}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}
