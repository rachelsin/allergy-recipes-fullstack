import React from 'react'

export default function NameAndDescrip(props) {
  const { recipeNameRef, descriptionRef } = props
  return (
    <>
      <div className="form-group">
        <label htmlFor="title" className=""><h5>Title</h5></label>
        <input name="title" id="title" type="text" className="form-control" ref={recipeNameRef} placeholder="Give your recipe a name" />
        <span className="errorSpan">Please give this recipe a title</span>
      </div>
      <div className="form-group">
        <label htmlFor="description" className=""><h5>Description</h5></label>
        <textarea name="description" id="description" className="form-control" rows="3" ref={descriptionRef} placeholder="Introduce your recipe, add notes, cooking tips, serving suggestions, etc..."></textarea>
        <span className="errorSpan">Please give this recipe a title</span>
      </div>
      {/*  <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" className="form-control" />
        <span className="errorSpan">Please give this recipe a title</span>
      </div> */}
    </>
  )
}
