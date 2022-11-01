import React, { useState } from 'react';
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const schema = yup.object().shape({
    qty: yup.number().typeError('Amount must be a number').required().max(1000000),
    measurement: yup.string().required().min(2),
    ingredient: yup.string().required().min(2).max(255),
}).required();

const schemaEdit = yup.object().shape({
    editQty: yup.number().typeError('Amount must be a number').required().min(1).max(1000000),
    editMeasurement: yup.string().required('ingredient is a required field').min(2, 'ingredient must be at least 2 characters'),
    editIngredient: yup.string().required().min(2).max(255),
}).required();

export default function Ingredients({ dataIngredients, setDataIngredients, errorIngredients, ingredientRef }) {

    const {
        register: ingredientRegister,
        handleSubmit: ingredientHandleSubmit,
        setValue: setValueIngredient,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            qty: "",
            measurement: "",
            ingredient: ""
        }
    });

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

    const [dataId, setDataId] = useState(null);
    const measurementArray = ["cup", "cups", "tsp", "tbsp", "gram", "kg", "ml", "liter", "unit", "package"]

    const addIngredients = data => {
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
        let idItem = id;
        setDataIngredients(dataIngredients.filter(item => item.id !== idItem));
    }

    function editFromData(data) {
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
            <h5 className='mt-3'> Ingredients* <span className='descriptionSpan mb-1'>at least 2 ingredients</span></h5>
            <div className='row mt-3'>
                <div className="col-md-3">
                    <label htmlFor="inputQty" className="form-label" ref={ingredientRef}>Amount</label >
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
                        <OverlayTrigger placement='right' overlay={<Tooltip>Add</Tooltip>}>
                            <i className="bi bi-plus-circle hoverIcon bigIcon" onClick={ingredientHandleSubmit(addIngredients)}></i>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>

            {dataIngredients.length > 0 ?
                <table className="table">
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
                                                    <OverlayTrigger overlay={<Tooltip>Cancel</Tooltip>}>
                                                        <i className="bi bi-backspace hoverIcon" onClick={handleCancelClick}></i>
                                                    </OverlayTrigger>
                                                </span>
                                                <span className='p-2'>
                                                    <OverlayTrigger overlay={<Tooltip>Save</Tooltip>}>
                                                        <i className="bi bi-save hoverIcon" onClick={editHandleSubmit(saveEditFromData)}></i>
                                                    </OverlayTrigger>
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
                                                    <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                                                        <i className="bi bi-pencil hoverIcon"
                                                            onClick={() => editFromData(data)}></i>
                                                    </OverlayTrigger>
                                                </span>
                                                <span className='p-2'>
                                                    <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                                                        <i className="bi bi-x-lg hoverIcon"
                                                            onClick={() => removeFromData(data.id)}></i>
                                                    </OverlayTrigger>
                                                </span>
                                            </div>
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
            <span className="errorSpan"> {errorIngredients}
            </span>
        </>
    )
}

