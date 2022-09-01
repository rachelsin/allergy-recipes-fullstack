import React, { useRef, useState } from 'react';
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup
    .object()
    .shape({
        step: yup.string().required().min(2).max(255),
    })
    .required();

export default function Preparation({ dataPreparation, setDataPreparation, errorPreparation }) {
    const {
        register: preparationRegister,
        handleSubmit: preparationHandleSubmit,
        setValue: preparationSetValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            step: "",
        }
    });
    const stepRef = useRef('');
    const [editIndexStep, setEditIndexStep] = useState(null);
    // const [editOneStep, setEditOneStep] = useState("")

    function addLine(e) {
        e.preventdefault();
        let step = stepRef.current.value;
        console.log('step', step);
        const newData = [...dataPreparation, step];
        setDataPreparation(newData)
        stepRef.current.value = "";
    }

    function editStep(arr, index) {
        console.log("hi", index);
        setEditIndexStep(index);
        preparationSetValue("step", arr);
    }

    function handleCancelClick() {
        setEditIndexStep(null);
    }
    function saveEditStep(data) {
        // const idStep = indexParamter;
        const dataEdit = data.step
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
            <label><h5> Preparation* </h5></label>
            <div className='row'>
                <div className='col-md-10'>
                    <input type="text" className="form-control" placeholder="Add the preparation steps, each step added separately.." ref={stepRef} />
                </div>
                <div className='col-md-2'>
                    <button className='form-control bg-success text-white' onClick={(e) => addLine(e)}>add</button>
                </div>
            </div>
            <span className='errorSpan'>{errorPreparation}</span>

            <br />

            <div>
                {dataPreparation ?
                    dataPreparation.map((arr, index) => (
                        <>
                            {editIndexStep === index ? (
                                <div className='row' key={arr}>
                                    <div className='col-md-8'>
                                        <input type="text" className="form-control" placeholder=""
                                            {...preparationRegister("step")} />
                                        <span className="errorSpan">
                                            {errors.step?.message}
                                        </span>
                                    </div>
                                    <div className='col-md-2'>
                                        <button className='form-control bg-success text-white'
                                            onClick={handleCancelClick}
                                        >Cancel</button>
                                    </div>
                                    <div className='col-md-2'>
                                        <button className='form-control bg-success text-white'
                                            onClick={preparationHandleSubmit(saveEditStep)}
                                        >Save</button>
                                    </div>
                                </div>
                            ) : (
                                <div key={arr}>{arr}
                                    <button
                                        className='btn btn-outline-danger btn-sm'
                                        onClick={() => editStep(arr, index)}
                                    >Edit
                                    </button>
                                    <button
                                        className='btn btn-outline-danger btn-sm'
                                        onClick={() => removeStep(arr, index)}
                                    >Delete
                                    </button>
                                </div>
                            )
                            }
                        </>
                    )) : null
                }
            </div>
        </>
    )
}

