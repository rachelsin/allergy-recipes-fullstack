import React from 'react'

export default function Input({ label, name, register, required }) {
    return (
        <>
            <label htmlFor={name}><h5>{label}</h5></label>
            <input
                {...register({ name }, { required: true, maxLength: 255, minLength: 2 })}
                type='text'
                placeholder="title"
                className='form-control'
                name={name}
                id={name}
            />
            <span className="errorSpan">
                {errors.title?.type === "required" && "title a recipe is required" ||
                    errors.title?.type === "maxLength" && "title a recipe max 20 " ||
                    errors.title?.type === "minLength" && "title a recipe min 2 "}
            </span>
        </>
    )
}
