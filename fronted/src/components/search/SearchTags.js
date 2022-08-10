import React from 'react'

import eggs from '../../images/eggs.png'
import fish from '../../images/fish.png'
import milk from '../../images/milk.png'
import nuts from '../../images/nuts.png'
import peanuts from '../../images/peanuts.png'
import sesame from '../../images/sesame.png'
import soya from '../../images/soya.png'
import wheat from '../../images/wheat.png'

// import styles from "./SearchTags.module.css";
const styles = {
    width: '5rem',
    backgroundColor: 'red'
};
const allergyFood = [milk, eggs, fish, nuts, peanuts, sesame, soya, wheat]
const allergyFoodNames = ['Milk', 'Egg', 'Fish', 'Nuts', 'Peanuts', 'Sesame', 'Soya', 'Wheat']
const allergyFoodi = {
    milk: "Milk",
    eggs: "Egg",
    fish: "Fish",
    nuts: "Nuts",
    peanuts: "Peanuts",
    sesame: "Sesame",
    soya: "Soya",
    wheat: "Wheat"
}

export default function SearchTags() {
    return (
        <div>
            {allergyFood.map((food) => (
                <>
                    <img key={food} style={styles} src={food} className='rounded-circle m-4' />
                    <i>j</i>
                </>
            ))}
            {allergyFoodNames.map((name) => (
                <p key={name}>{name}</p>
            ))}
            {/* <img style={styles} src={eggs} alt="eggs" className='rounded-circle m-4' />
            <img style={styles} src={fish} alt="eggs" className='rounded-circle m-4' />
            <img style={styles} src={milk} alt="eggs" className='rounded-circle m-4' />
            <img style={styles} src={nuts} alt="eggs" className='rounded-circle m-4' />
            <img style={styles} src={peanuts} alt="eggs" className='rounded-circle m-4' />
            <img style={styles} src={sesame} alt="eggs" className='rounded-circle m-4' />
            <img style={styles} src={soya} alt="eggs" className='rounded-circle m-4' />
            <img style={styles} src={wheat} alt="eggs" className='rounded-circle m-4' /> */}
        </div>
    )
}
