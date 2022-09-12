import React from 'react'

export default function ImageRecipe({ register, errors }) {
    return (
        <div>
            <label htmlFor="img"><h5>Photo</h5></label>
            <input
                {...register("imageRecipe")}
                type='text'
                placeholder=""
                className='form-control'
                name='img'
                id="img"
            />
            <span className="errorSpan">
                {errors.imageRecipe?.message}
            </span>
        </div>
    )
}
