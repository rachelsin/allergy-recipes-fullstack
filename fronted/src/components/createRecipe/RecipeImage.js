import React from 'react'

export default function RecipeImage(props) {
    const { recipeImageRef } = props
    return (
        <>
            <div className="col-12">
                <label className="form-label">*Recipe Image</label>
                <input type="text" className="form-control" ref={recipeImageRef} />
            </div>
        </>
    )
}
