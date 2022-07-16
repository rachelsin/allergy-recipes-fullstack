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
                        </tr>
                    </thead>
                    <tbody>

                        {dataIngredients.map(allData => (
                            <tr key={allData.id}>
                                <td>{allData.qty}</td>
                                <td>{allData.measurement} </td>
                                <td> {allData.ingredient}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                : null

            }
        </>
    )
}

