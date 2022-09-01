import React from 'react'

export default function TagsAllergy({ register, errors }) {

    const checkList = ["milk", "peanut", "egg", "soya", "nuts", "wheat", "sesame", "fish"];

    return (
        <>
            <label><h5>Free of*</h5></label>
            <div className='row'>
                {checkList.map((item, index) => (
                    <div key={index} className="form-check mx-3 col-md-2">
                        <input
                            value={item}
                            type="checkbox"
                            className='form-check-input'
                            {...register("tagsFreeOf", { required: true })} />
                        <label className='form-check-label' >{item}</label>
                        {/* <span className={isChecked(item)}>{item}</span> */}
                    </div>
                ))}
            </div>
            <span className="errorSpan">
                {errors.tagsFreeOf?.message}
            </span>
        </>
    );
}
