import React, { useRef, useState } from 'react';
import { nanoid } from "nanoid";

export default function Ingredients(props) {
    const { dataIngredients, setDataIngredients } = props;

    const qtyRef = useRef('')
    const measurementRef = useRef('')
    const ingredientRef = useRef('')

    // const [dataIngredients, setDataIngredients] = useState([])
    // const qtyRef = useRef('')
    // const measurementRef = useRef('')
    // const ingredientRef = useRef('')

    const [dataId, setDataId] = useState(null);

    const [qty, setQty] = useState("")
    const [measurement, setMeasurement] = useState("")
    const [ingredient, setIngredient] = useState("")

    const [editQty, setEditQty] = useState("")
    const [editMeasurement, setEditMeasurement] = useState("")
    const [editIngredient, setEditIngredient] = useState("")


    function addLine() {
        console.log('hi');
        let data = {
            id: nanoid(),
            qty: qty,
            measurement: measurement,
            ingredient: ingredient,
        };
        const newData = [...dataIngredients, data];
        setDataIngredients(newData)
        qtyRef.current.value = "";
        measurementRef.current.value = "";
        ingredientRef.current.value = "";
        setQty(null);
        setMeasurement(null);
        setIngredient(null);
    }
    function removeFromData(id) {
        console.log(id);
        let idItem = id;
        setDataIngredients(dataIngredients.filter(item => item.id !== idItem));
    }

    function editFromData(data) {
        const {id,qty,measurement,ingredient} = data 
        setDataId(id)
        setEditQty(qty)
        setEditMeasurement(measurement)
        setEditIngredient(ingredient)
    }

    function handleCancelClick() {
        setDataId(null)
    }
    function saveEditFromData(id){
        const editData ={
            id:id,
            qty: editQty,
            measurement: editMeasurement,
            ingredient: editIngredient
        }
        const newEdidData = [...dataIngredients]
        const index = dataIngredients.findIndex((data) => data.id === dataId);
        newEdidData[index] = editData;
        setDataIngredients(newEdidData);
        setDataId(null)
    }


    return (
        <>
            <p> Ingredients: </p>
            <div className='row'>
                <input type="text" className="form-control col m-2" placeholder="Qty." onChange={(e) => setQty(e.target.value)} ref={qtyRef} />
                <input type="text" className="form-control col m-2" placeholder="Measurement" onChange={(e) => setMeasurement(e.target.value)} ref={measurementRef} />
                <input type="text" className="form-control col m-2" placeholder="Ingredient" onChange={(e) => setIngredient(e.target.value)} ref={ingredientRef} />
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

                        {dataIngredients.map(data => (
                            <>
                                {dataId === data.id ? (
                                    <tr key={data.id}>
                                        <td>
                                            <input type="text" className="form-control col m-2" placeholder="Qty." onChange={(e) => setEditQty(e.target.value)} value={editQty} />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control col m-2" placeholder="measurement" onChange={(e) => setEditMeasurement(e.target.value)} value={editMeasurement} />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control col m-2" placeholder="ingredient" onChange={(e) => setEditIngredient(e.target.value)} value={editIngredient} />
                                        </td>
                                        <td>
                                            <button
                                                className='btn btn-outline-danger btn-sm'
                                                onClick={() => saveEditFromData(data.id)}
                                            >Save
                                            </button>
                                            <button
                                                className='btn btn-outline-danger btn-sm'
                                                onClick={() => handleCancelClick()}
                                            >Cancel
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={data.id}>
                                        <td>{data.qty}</td>
                                        <td>{data.measurement} </td>
                                        <td> {data.ingredient}</td>
                                        <td>
                                            <button
                                                className='btn btn-outline-danger btn-sm'
                                                onClick={() => editFromData(data)}
                                            >Edit
                                            </button>
                                            <button
                                                className='btn btn-outline-danger btn-sm'
                                                onClick={() => removeFromData(data.id)}
                                            >Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                                }
                            </>
                        ))}

                    </tbody>
                </table>
                : null

            }
        </>
    )
}

