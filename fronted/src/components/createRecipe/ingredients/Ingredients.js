import React, { useRef, useState } from 'react';
import { nanoid } from "nanoid";

export default function Ingredients(props) {
    const { dataIngredients, setDataIngredients, qtyRef, measurementRef, ingredientRef } = props;

    // const [dataIngredients, setDataIngredients] = useState([])
    // const qtyRef = useRef('')
    // const measurementRef = useRef('')
    // const ingredientRef = useRef('')

    function addLine() {
        let data = {
            id: nanoid(),
            qty: qtyRef.current.value,
            measurement: measurementRef.current.value,
            ingredient: ingredientRef.current.value,
        };
        console.log(data);
        const newData = [...dataIngredients, data];
        setDataIngredients(newData)
        qtyRef.current.value = "";
        measurementRef.current.value = "";
        ingredientRef.current.value = "";
    }
    function removeFromCart(id) {
        console.log(id);
        let idItem = id;
        setDataIngredients(dataIngredients.filter(item => item.id !== idItem));
    }

    return (
        <>


            <p> Ingredients: </p>
            <div className='row'>
                <input type="text" className="form-control col m-2" placeholder="Qty." ref={qtyRef} />
                <input type="text" className="form-control col m-2" placeholder="Measurement" ref={measurementRef} />
                <input type="text" className="form-control col m-2" placeholder="Ingredient" ref={ingredientRef} />
                <button className='btn col btn-danger m-2' onClick={addLine}>add</button>
            </div>
            <br></br>
            {dataIngredients.length > 0 ?
                <table className="table border">
                    <thead>
                        <tr>
                            <th scope="col">Qty.</th>
                            <th scope="col">Measurement</th>
                            <th scope="col">Ingredient</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {dataIngredients.map(ingredient => (
                            <tr key={ingredient.id}>
                                <td>{ingredient.qty}</td>
                                <td>{ingredient.measurement} </td>
                                <td> {ingredient.ingredient}</td>
                                <td>
                                    <button
                                        className='btn btn-outline-danger'
                                        onClick={() => removeFromCart(ingredient.id)}
                                    >Update
                                    </button>
                                    <button
                                        className='btn btn-outline-danger'
                                        onClick={() => removeFromCart(ingredient.id)}
                                    >Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                : null

            }
        </>
    )
}

