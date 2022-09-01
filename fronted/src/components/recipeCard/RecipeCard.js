import React from 'react'
import { Card, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './recpieCard.css'
import tags from '../../images/tags.png'


export default function RecipeCard(props) {
    const { recipeItem } = props;
    const { tagsFreeOf } = recipeItem;
    return (
        <Col md="auto" className='m-4 mb-5'>
            <Card style={{ width: '18rem', height: '14rem' }} className="clickMe">
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
                    <Card.Img variant="top" src={recipeItem.recipeImage} style={{ width: '18rem', height: '14rem' }} />
                    <div className='box'>
                        {recipeItem.nameRecipe}
                    </div>
                </Link>
            </Card>
        </Col>
    )
}
