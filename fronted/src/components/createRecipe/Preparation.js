import React, { useRef, useState } from 'react';

export default function Preparation(props) {
    const { datapre, setDatapre, stepRef } = props;




    function addLine() {
        let stepss = stepRef.current.value;
        console.log(stepss);

        const newData = [...datapre, stepss];
        setDatapre(newData)

        stepRef.current.value = "";

    }

    return (
        <>
            <p> Preparation: </p>
            <p> Add the preparation steps, each step added separately: </p>

            <div className='col-12'>
                <input type="text" className="form-control " placeholder="step" ref={stepRef} />
                <button className='btn col btn-danger col-3 m-2' onClick={addLine}>add</button>
            </div>
            <ul>
                {datapre ?
                    datapre.map(arr => (
                        <li key={arr}>{arr}</li>
                    )) : <p>no detalis</p>
                }
            </ul>
        </>
    )
}

