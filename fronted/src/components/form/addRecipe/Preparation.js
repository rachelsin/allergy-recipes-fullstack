import React, { useState } from 'react';
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const schema = yup
    .object()
    .shape({
        step: yup.string().required('Preparation is a required field').min(2, 'Preparation must be at least 2 characters').max(255),
    })
    .required();
const schemaEdit = yup
    .object()
    .shape({
        editStep: yup.string().required('Preparation is a required field').min(2, 'Preparation must be at least 2 characters').max(1200),
    })
    .required();

export default function Preparation({ dataPreparation, setDataPreparation, errorPreparation }) {

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

    const [editIndexStep, setEditIndexStep] = useState(null);

    const addStep = data => {
        let { step } = data;
        const newData = [...dataPreparation, step];
        setDataPreparation(newData)
        SetValuePreparation("step", "")
    }

    function editStep(arr, index) {
        setEditIndexStep(index);
        editPreparationSetValue("editStep", arr);
    }

    function handleCancelClick() {
        setEditIndexStep(null);
    }
    function saveEditStep(data) {
        const dataEdit = data.editStep
        const newEdidStep = [...dataPreparation]
        const index = dataPreparation.findIndex((x, index) => index === editIndexStep);
        newEdidStep[index] = dataEdit;
        setDataPreparation(newEdidStep);
        setEditIndexStep(null)
    }
    function removeStep(arr, index) {
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
                <div className='col-md-1 px-1 ' >
                    <OverlayTrigger placement='right' overlay={<Tooltip>Add</Tooltip>}>
                        <i className="bi bi-plus-circle hoverIcon" style={{ fontSize: '1.5em', width: '1.5em', height: '1.5em', padding: '0.1em' }} onClick={preparationHandleSubmit(addStep)}></i>
                    </OverlayTrigger>

                </div>


            </div>


            <div className='mt-3'>
                <table className='table'>
                    <tbody>
                        {dataPreparation ?
                            dataPreparation.map((arr, index) => (
                                <>
                                    {editIndexStep === index ? (
                                        <tr key={index}>
                                            <td>
                                                <div className='d-flex'>
                                                    <span className="me-auto flex-grow-1">
                                                        <input className='form-control' {...editPreparationRegister("editStep")} />
                                                        <span className="errorSpan">
                                                            {editErrors.editStep?.message}
                                                        </span>
                                                    </span>
                                                    <span className='p-2'>
                                                        <OverlayTrigger overlay={<Tooltip>Cancel</Tooltip>}>
                                                            <i className="bi bi-backspace hoverIcon" onClick={handleCancelClick}></i>
                                                        </OverlayTrigger>
                                                    </span>
                                                    <span className='p-2 hoverIcon'>
                                                        <OverlayTrigger overlay={<Tooltip>Save</Tooltip>}>
                                                            <i className="bi bi-save" onClick={editPreparationHandleSubmit(saveEditStep)}></i>
                                                        </OverlayTrigger>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr key={index}>
                                            <td>
                                                <div className='d-flex'>
                                                    <span className="me-auto p-2">{arr}</span>
                                                    <span className='p-2 hoverIcon'>
                                                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                                                            <i className="bi bi-pencil" onClick={() => editStep(arr, index)}></i>
                                                        </OverlayTrigger>
                                                    </span>
                                                    <span className='p-2 hoverIcon'>
                                                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                                                            <i className="bi bi-x-lg"
                                                                onClick={() => removeStep(arr, index)}></i>
                                                        </OverlayTrigger>
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