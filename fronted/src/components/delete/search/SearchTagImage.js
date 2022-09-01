import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Card, Col } from 'react-bootstrap';


import eggs from '../../images/eggs.png'
import fish from '../../images/fish.png'
import milk from '../../images/milk.png'
import nuts from '../../images/nuts.png'
import peanuts from '../../images/peanuts.png'
import sesame from '../../images/sesame.png'
import soya from '../../images/soya.png'
import wheat from '../../images/wheat.png'

import './searchTag.css'

export default function SearchTagImage(props) {
    const { checked, setChecked, allergyFood, myHistorySearch, setMyHistorySearch, checkIf } = props
    // const [checked, setChecked] = useState([]);
    const checkList = ["Milk", "peanut", "Egg", "soy", "Tree Nut", "Wheat", "Sesame", "Fish"];
    /*   const allergyFood = [
          { nameList: "milk", nameImage: milk, nameWrite: "Milk" },
          { nameList: "peanut", nameImage: peanuts, nameWrite: "Peanut" },
          { nameList: "egg", nameImage: eggs, nameWrite: "Egg" },
          { nameList: "soy", nameImage: soya, nameWrite: "Soya" },
          { nameList: "nuts", nameImage: nuts, nameWrite: "Nuts" },
          { nameList: "wheat", nameImage: wheat, nameWrite: "Wheat" },
          { nameList: "sesame", nameImage: sesame, nameWrite: "Sesame" },
          { nameList: "fish", nameImage: fish, nameWrite: "Fish" },
      ] */
    // const checkListasa = ["milk", "peanut", "egg", "soy", "tree nut", "wheat", "sesame", "fish"];


    // Add/Remove checked item from list
    const handleCheck = (event) => {
        let updatedList = [...checked];
        console.log(checked);
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        let update = [...new Set(updatedList)];

        setChecked(update);
        console.log(checked);
    };

    // Generate string of checked items
    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    // Return classes based on whether item is checked
    // let isChecked = (item) =>
    //     checked.includes(item) ? "checked-item" : "not-checked-item";


    const styles = {
        width: '5rem',
        border: "3px solid #feedc0c7"
    };
    return (

        <Col md="auto" className=''>
            {allergyFood.map((item, index) => (

                <label className="option_item mx-3 " key={index}>
                    <input value={item.nameList} type="checkbox" onChange={handleCheck} className="checkbox"
                        checked={checkIf(item.nameList)}
                    />
                    <div className="option_inner" >
                        <div className="tickmark">
                            <div className="line"></div>
                        </div>
                        <div className="image">
                            <img src={item.nameImage} style={styles} className='rounded-circle mx-3 my-1' />
                        </div>
                        <div className="name mb-3">{item.nameWrite}</div>
                    </div>
                </label>

            ))}
        </Col>


    );
}

