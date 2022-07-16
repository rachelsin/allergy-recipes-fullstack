import React from 'react'

export default function NameAndDescrip(props) {
  const { recipeNameRef, descriptionRef } = props
  return (
    <>
      <div className="col-12">
        <label className="form-label">*Recipe Name</label>
        <input type="text" className="form-control" ref={recipeNameRef} />
      </div>
      <div className="mb-3">
        <label className="form-label"> Description:</label>
        <textarea className="form-control" rows="3" ref={descriptionRef}></textarea>
      </div>
    </>
  )
}
