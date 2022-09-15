import React from 'react'
import { Row, Col } from 'react-bootstrap';

import eggs from '../../../images/eggs.png'
import fish from '../../../images/fish.png'
import milk from '../../../images/milk.png'
import nuts from '../../../images/nuts.png'
import peanuts from '../../../images/peanuts.png'
import sesame from '../../../images/sesame.png'
import soya from '../../../images/soya.png'
import wheat from '../../../images/wheat.png'

import './searchTag.css'


export default function SearchTags({ register }) {
    const allergyFood = [
        { nameList: "milk", nameImage: milk, nameWrite: "Milk" },
        { nameList: "peanut", nameImage: peanuts, nameWrite: "Peanut" },
        { nameList: "egg", nameImage: eggs, nameWrite: "Egg" },
        { nameList: "soya", nameImage: soya, nameWrite: "Soya" },
        { nameList: "nuts", nameImage: nuts, nameWrite: "Nuts" },
        { nameList: "wheat", nameImage: wheat, nameWrite: "Wheat" },
        { nameList: "sesame", nameImage: sesame, nameWrite: "Sesame" },
        { nameList: "fish", nameImage: fish, nameWrite: "Fish" },
    ]
    return (
        <div className='bg-l2 m-auto'>
            <Row className="justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center">
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
                                    <img src={item.nameImage} className='styleImage rounded-circle mx-3 my-1 img-fluid' />
                                </div>
                                <div className="name mb-3">{item.nameWrite}</div>
                            </div>
                        </label>

                    ))}
                </Col>
            </Row>
        </div>
    )
}
