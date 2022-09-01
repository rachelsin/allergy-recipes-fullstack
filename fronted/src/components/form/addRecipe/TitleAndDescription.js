import React from 'react'

export default function TitleAndDescription({ register, errors }) {
    return (
        <div>
            <label htmlFor="title"><h5>Title*</h5></label>
            <input
                {...register("title")}
                type='text'
                placeholder="Give your recipe a name"
                className='form-control'
                name='title'
                id="title"
            />
            <span className="errorSpan">
                {errors.title?.message}
            </span>
            <label htmlFor="description"><h5>Description</h5></label>
            <textarea
                {...register("description")}
                type='text'
                placeholder="Introduce your recipe, add notes, cooking tips, serving suggestions, etc..."
                className='form-control'
                name='description'
                id="description"
                row="3"
            />
            <span className="errorSpan">
                {errors.description?.message}
            </span>
        </div>
    )
}
