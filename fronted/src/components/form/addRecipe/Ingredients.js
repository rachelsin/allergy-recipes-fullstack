import React, { useRef, useState } from 'react';
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";




export default function Ingredients({ dataIngredients, setDataIngredients, errorIngredients }) {
    const schema = yup.object().shape({
        qty: yup.number().required().max(1000000),
        measurement: yup.string().required().min(2),
        ingredient: yup.string().required().min(2).max(255),
    }).required();

    const { register: ingredientRegister, handleSubmit: ingredientHandleSubmit, setValue: setValueIngredient, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            qty: "",
            measurement: "",
            ingredient: ""
        }
    });
    const schemaEdit = yup.object().shape({
        editQty: yup.number().required().min(1).max(1000000),
        editMeasurement: yup.string().required().min(2),
        editIngredient: yup.string().required().min(2).max(255),
    }).required();

    const {
        register: editRegister,
        handleSubmit: editHandleSubmit,
        setValue: editSetValue,
        formState: { errors: editErrors }
    } = useForm({
        resolver: yupResolver(schemaEdit),
        defaultValues: {
            editQty: "",
            editMeasurement: "",
            editIngredient: ""
        }
    });

    const measurementArray = ["cup", "cups", "tsp", "tbsp", "gram", "kg", "ml", "liter", "unit", "package"]
    const [dataId, setDataId] = useState(null);

    function addIngredients(data) {
        let dataBasic = {
            id: nanoid(),
            qty: data.qty,
            measurement: data.measurement,
            ingredient: data.ingredient,
        };
        const newData = [...dataIngredients, dataBasic];
        setDataIngredients(newData)
        setValueIngredient("qty", "")
        setValueIngredient("measurement", "")
        setValueIngredient("ingredient", "")
    }
    function removeFromData(id) {
        console.log(id);
        let idItem = id;
        setDataIngredients(dataIngredients.filter(item => item.id !== idItem));
    }

    function editFromData(data) {
        // console.log(id);
        const { id, qty, measurement, ingredient } = data;
        setDataId(id)
        editSetValue("editQty", qty)
        editSetValue("editMeasurement", measurement)
        editSetValue("editIngredient", ingredient)
    }

    function handleCancelClick() {
        setDataId(null)
    }
    function saveEditFromData(data) {
        const editData = {
            id: dataId,
            qty: data.editQty,
            measurement: data.editMeasurement,
            ingredient: data.editIngredient
        }
        const newEdidData = [...dataIngredients]
        const index = dataIngredients.findIndex((data) => data.id === dataId);
        newEdidData[index] = editData;
        setDataIngredients(newEdidData);
        setDataId(null)
    }


    return (
        <>
            <h5 className='mt-3'> Ingredients* <span className='descriptionSpan mb-1'>{errorIngredients}</span></h5>


            <div className='row mt-3'>
                <div className="col-md-3">
                    <label htmlFor="inputQty" className="form-label">Amount</label>
                    <input  {...ingredientRegister("qty")} type="text" className="form-control" id="inputQty" />
                    <span className="errorSpan">
                        {errors.qty?.message}
                    </span>
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">Measurement</label>
                    <select {...ingredientRegister("measurement")}
                        id="inputState" className="form-select">
                        <option value="" disabled>Choose one</option>
                        {measurementArray.map((measurement, index) => (
                            <option key={index} value={measurement}>{measurement}</option>
                        ))}
                    </select>
                    <span className="errorSpan">
                        {errors.measurement?.message}
                    </span>
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputIngredient" className="form-label">Ingredient</label>
                    <input {...ingredientRegister("ingredient")}
                        type="text" className="form-control" id="inputIngredient" />
                    <span className="errorSpan">
                        {errors.ingredient?.message}
                    </span>
                </div>
                <div className="col-md-1 px-1">
                    <label htmlFor="inputIngredient" className="form-label text-white">.</label>
                    <div>
                        <i className="bi bi-plus-circle hoverIcon" style={{ fontSize: '1.5em' }} onClick={ingredientHandleSubmit(addIngredients)}></i>
                    </div>

                    {/* <button className='form-control bg-success text-white' onClick={ingredientHandleSubmit(addIngredients)}>add</button> */}
                </div>
            </div>

            {dataIngredients.length > 0 ?
                <table className="table">
                    {/* <thead>
                        <tr>
                            <th scope="col">amount</th>
                            <th scope="col">Measurement</th>
                            <th scope="col">Ingredient</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead> */}
                    <tbody>

                        {dataIngredients.map(data => (
                            <>
                                {dataId === data.id ? (
                                    <tr key={data.id}>
                                        <td>
                                            <div className='d-flex'>
                                                <span className="me-auto ">
                                                    <input className='form-control' placeholder="Qty."  {...editRegister("editQty")} />
                                                    <span className="errorSpan"> {editErrors.editQty?.message}
                                                    </span>
                                                </span>
                                                <span className="me-auto flex-grow-1 px-2">

                                                    <select {...editRegister("editMeasurement")}
                                                        id="inputState" className="form-select">
                                                        <option value="" disabled>Choose one</option>
                                                        {measurementArray.map((measurement, index) => (
                                                            <option key={index} value={measurement}>{measurement}</option>
                                                        ))}
                                                    </select>

                                                    <span className="errorSpan"> {editErrors.editMeasurement?.message}
                                                    </span>
                                                </span>

                                                <span className="me-auto flex-grow-1">
                                                    <input className='form-control' placeholder="ingredient" {...editRegister("editIngredient")} />
                                                    <span className="errorSpan"> {editErrors.editIngredient?.message}
                                                    </span>
                                                </span>
                                                <span className='p-2'>
                                                    <i className="bi bi-backspace hoverIcon" onClick={handleCancelClick}></i>
                                                </span>
                                                <span className='p-2'>
                                                    <i className="bi bi-save hoverIcon" onClick={editHandleSubmit(saveEditFromData)}></i>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={data.id}>
                                        <td>
                                            <div className='d-flex'>
                                                <span className="me-auto p-2">{data.qty} {data.measurement} {data.ingredient}</span>
                                                <span className='p-2'>
                                                        <i className="bi bi-pencil hoverIcon"
                                                        onClick={() => editFromData(data)}></i>
                                                </span>
                                                <span className='p-2'>
                                                    <i className="bi bi-x-lg hoverIcon"
                                                        onClick={() => removeFromData(data.id)}></i>
                                                </span>
                                            </div>
                                        </td>
                                        {/* <td>{data.qty}</td>
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
                                                onClick={() => FromData(data.id)}
                                            >TestEdit
                                            </button>
                                            <button
                                                className='btn btn-outline-danger btn-sm'
                                                onClick={() => removeFromData(data.id)}
                                            >Delete
                                            </button>
                                        </td> */}
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

