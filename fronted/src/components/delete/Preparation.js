import React, { useRef, useState } from 'react';

export default function Preparation(props) {
    const { datapre, setDatapre, stepRef } = props;

    const [editIndexStep, setEditIndexStep] = useState(null)
    const [editOneStep, setEditOneStep] = useState("")

    function addLine() {
        let stepss = stepRef.current.value;
        console.log(stepss);

        const newData = [...datapre, stepss];
        setDatapre(newData)

        stepRef.current.value = "";
    }
    function editStep(arr, index) {
        console.log("hi", index);
        setEditIndexStep(index);
        setEditOneStep(arr);
    }

    function handleCancelClick() {
        setEditIndexStep(null);
    }
    function saveEditStep(indexParamter) {
        const idStep = indexParamter;
        const dataEdit = editOneStep
        const newEdidStep = [...datapre]
        const index = datapre.findIndex((x, index) => index === idStep);
        newEdidStep[index] = dataEdit;
        setDatapre(newEdidStep);
        setEditIndexStep(null)
    }

    return (
        <>
            <label><h5> Preparation: </h5></label>
            <div className='row'>
                <input type="text" className="form-control col m-2 " placeholder="Add the preparation steps, each step added separately" ref={stepRef} />
                <button className='btn col btn-danger col-1 m-2' onClick={() => addLine()}>add</button>
            </div>
            <ul>
                {datapre ?
                    datapre.map((arr, index) => (
                        <>
                            {editIndexStep === index ? (
                                <div className='row' key={arr}>
                                    <input type="text" className="form-control col m-2" placeholder="Ingredient"
                                        onChange={(e) => setEditOneStep(e.target.value)} value={editOneStep} />
                                    <button className='btn col-2 btn-danger m-2'
                                        onClick={handleCancelClick}
                                    >Cancel</button>
                                    <button className='btn col-2 btn-danger m-2'
                                        onClick={() => saveEditStep(index)}
                                    >Save</button>
                                </div>
                            ) : (
                                <li key={arr}>{arr}
                                    <button
                                        className='btn btn-outline-danger btn-sm'
                                        onClick={() => editStep(arr, index)}
                                    >Edit
                                    </button>
                                </li>
                            )
                            }
                        </>
                    )) : null
                }
            </ul>
        </>
    )
}
