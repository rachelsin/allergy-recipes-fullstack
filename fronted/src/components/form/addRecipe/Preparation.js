import React, { useRef, useState } from 'react';
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


export default function Preparation({ dataPreparation, setDataPreparation, errorPreparation }) {
    const schema = yup
        .object()
        .shape({
            step: yup.string().required().min(2).max(255),
        })
        .required();
    const {
        register: preparationRegister,
        handleSubmit: preparationHandleSubmit,
        setValue: SetValuePreparation,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            step: "",
        }
    });
    const schemaEdit = yup
        .object()
        .shape({
            editStep: yup.string().required().min(2).max(255),
        })
        .required();
    const {
        register: editPreparationRegister,
        handleSubmit: editPreparationHandleSubmit,
        setValue: editPreparationSetValue,
        formState: { errors: editErrors }
    } = useForm({
        resolver: yupResolver(schemaEdit),
        defaultValues: {
            editStep: "",
        }
    });

    // const stepRef = useRef('');
    const [editIndexStep, setEditIndexStep] = useState(null);
    // const [editOneStep, setEditOneStep] = useState("")

    function addStep(data) {
        let { step } = data;
        console.log('step', step);
        const newData = [...dataPreparation, step];
        console.log('fff');
        setDataPreparation(newData)
        SetValuePreparation("step", "")
        console.log('done');
        // stepRef.current.value = "";
    }

    function editStep(arr, index) {
        setEditIndexStep(index);
        editPreparationSetValue("editStep", arr);
    }

    function handleCancelClick() {
        setEditIndexStep(null);
    }
    function saveEditStep(data) {
        // const idStep = indexParamter;
        const dataEdit = data.editStep
        const newEdidStep = [...dataPreparation]
        const index = dataPreparation.findIndex((x, index) => index === editIndexStep);
        newEdidStep[index] = dataEdit;
        setDataPreparation(newEdidStep);
        setEditIndexStep(null)
    }
    function removeStep(arr, index) {
        console.log(index);
        let indexItem = index;
        setDataPreparation(dataPreparation.filter((x, index) => index !== indexItem));
    }


    return (
        <>
            <label className='mt-4'><h5> Preparation*  <span className='descriptionSpan mb-1'>{errorPreparation}</span></h5></label>

            <div className='row'>
                <div className='col-md-11'>
                    <input type="text" className="form-control" placeholder="Add the preparation steps, each step added separately.." {...preparationRegister("step")} />
                    <span className="errorSpan">
                        {errors.step?.message}
                    </span>
                </div>

                <div className='col-md-1 px-1 '>
                    <i className="bi bi-plus-circle hoverIcon" style={{ fontSize: '1.5em', width: '1.5em', height: '1.5em', padding: '0.1em' }} onClick={preparationHandleSubmit(addStep)}></i>
                    {/* <button className='form-control bg-success text-white' >add</button> */}
                </div>
            </div>


            <div className='mt-3'>
                <table className='table'>
                    <tbody>
                        {dataPreparation ?
                            dataPreparation.map((arr, index) => (
                                <>
                                    {editIndexStep === index ? (
                                        <>
                                            <tr key={index}>
                                                <td>
                                                    <div className='d-flex'>
                                                        <span className="me-auto flex-grow-1">
                                                            {/* <div className="" > */}
                                                            <input className='form-control' {...editPreparationRegister("editStep")} />
                                                            <span className="errorSpan">
                                                                {editErrors.editStep?.message}
                                                            </span>
                                                            {/* </div> */}
                                                        </span>
                                                        <span className='p-2 '>
                                                            <i className="bi bi-backspace hoverIcon" onClick={handleCancelClick}></i>
                                                        </span>
                                                        <span className='p-2 hoverIcon'>
                                                            <i className="bi bi-save" onClick={editPreparationHandleSubmit(saveEditStep)}></i>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/*    <div className='row' key={arr}>
                                            <div className='d-flex align-items-center'>
                                                <div className="col md-9 m-2" >
                                                    <input className='form-control' {...editPreparationRegister("editStep")} />
                                                    <span className="errorSpan">
                                                        {editErrors.editStep?.message}
                                                    </span>
                                                </div>
                                                <i className="bi bi-backspace" onClick={handleCancelClick}></i>
                                                <i className="bi bi-save" onClick={editPreparationHandleSubmit(saveEditStep)}></i>

                                            </div>
                                            <div className='col-md-10 align-self-center'>
                                                <input type="text" className="form-control align-self-center mt-2" placeholder=""
                                                    {...editPreparationRegister("editStep")} />
                                                <span className="errorSpan">
                                                    {editErrors.editStep?.message}
                                                </span>
                                            </div>
                                            <div className='col-md-2 align-self-center my-3'>

                                                <i className="bi bi-backspace" onClick={handleCancelClick}></i>
                                                <i className="bi bi-save" onClick={editPreparationHandleSubmit(saveEditStep)}></i>

                                            </div>
                                            <div className='col-md-2'>
                                                <button className='form-control bg-success text-white'
                                                    onClick={handleCancelClick}
                                                >Cancel</button>
                                                <button className='form-control bg-success text-white'
                                                    onClick={editPreparationHandleSubmit(saveEditStep)}
                                                >Save</button>
                                            </div>
                                        </div> */}
                                        </>
                                    ) : (
                                        <tr key={index}>
                                            <td>
                                                <div className='d-flex'>
                                                    <span className="me-auto p-2">{arr}</span>
                                                    <span className='p-2 hoverIcon'>
                                                        <i className="bi bi-pencil"
                                                            onClick={() => editStep(arr, index)}></i>
                                                    </span>
                                                    <span className='p-2 hoverIcon'>
                                                        <i className="bi bi-x-lg"
                                                            onClick={() => removeStep(arr, index)}></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    }
                                </>
                            )) : null
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}