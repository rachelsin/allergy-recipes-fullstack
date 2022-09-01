import React from 'react'

export default function Img({ register, errors }) {
    return (
        <div>
            <>
                <label htmlFor="file" className="form-label"><h5>Add photo</h5></label>
                <input className="form-control" id="file" type="file" {...register("image")} />
                <span className="errorSpan">
                    {errors.image?.message}
                </span>
            </>
        </div>
    )
}
