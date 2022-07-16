import React from 'react'
import { Button, Card } from 'react-bootstrap';


export default function RecipeCard() {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_960_720.jpg" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </>
    )
}
