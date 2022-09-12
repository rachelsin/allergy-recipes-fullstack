import React from 'react'
import { Card, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './recpieCard.css'
import tags from '../../images/tags.png'


export default function RecipeCard(props) {
    const { recipeItem } = props;
    const { tagsFreeOf } = recipeItem;

    function checkImage() {
        let image = recipeItem.recipeImage
        let result = image.startsWith('http')
        if (result) {
            return image;
        } else {
            return `http://localhost:5001/${image}`;
        }
    }

    return (
        <Col md="auto" className='m-4 mb-5' key={recipeItem._id}>
            <Card style={{ width: '18rem', height: '14rem' }} className="clickMe" key={recipeItem._id}>
                <Link to={`/recpies/${recipeItem._id}`} className="noneLink">
                    <div className='tagsContainer'>
                        {tagsFreeOf.map(tag => (
                            <div className='imageNum1 mb-2'><img src={tags} style={{ width: '4.4rem' }} className="imageTag"></img><span className='textTag'>not {tag} </span> </div>
                        ))}
                    </div>

                    <div className='tagsContainer'>
                        {/* <div className='imageNum1 mb-2'><img src={tags} style={{ width: '3.2rem' }} className="imageTag"></img><span className='textTag'>not milk </span> </div> */}

                        {/*     <div className='tagsNum1'><span className='imageTagsText1'>not peanut</span><img src={tags} style={{ width: '3.2rem' }} className=""></img> </div>
                        <div className='tagsNum0'><span className='imageTagsText2'>not egg</span><img src={tags} style={{ width: '3.2rem' }} className=""></img> </div>
                        <div className='tagsNum1'><span className='imageTagsText3'>not soya</span><img src={tags} style={{ width: '3.2rem' }} className=""></img> </div>
                        <div className='tagsNum0'><span className='imageTagsText4'>not nuts</span><img src={tags} style={{ width: '3.2rem' }} className=""></img> </div>
                        <div className='tagsNum1'><span className='imageTagsText5'>not wheat</span><img src={tags} style={{ width: '3.2rem' }} className=""></img> </div>
                        <div className='tagsNum0'><span className='imageTagsText6'>not sesame</span><img src={tags} style={{ width: '3.2rem' }} className=""></img> </div>
                        <div className='tagsNum1'><span className='imageTagsText7'>not fish</span><img src={tags} style={{ width: '3.2rem' }} className=""></img> </div> */}
                    </div>
                    {/*  <span className='tagsimagePosition'>not
                        {tagsFreeOf.map(tag => (
                            <span key={tag}><img src={tags} style={{ width: '6rem' }} className="tagstextPosition"></img> {tag}</span>
                        ))}</span>
 */}
                    <Card.Img variant="top" src={checkImage()} style={{ height: '15rem', objectFit: 'cover'  }}  className="imgCard"/>
                    <div className='box'>
                        {recipeItem.nameRecipe}
                    </div>
                </Link>
            </Card>
        </Col>
    )
}
