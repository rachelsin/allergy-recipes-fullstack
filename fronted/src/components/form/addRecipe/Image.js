import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


export default function Image({ register, errors, deleteImage, imageUploud }) {

    return (
        <div>
            {/*  <label className="form-label"><h5> Add photo</h5></label>
            <input className="form-control" id="file" type="file" {...register("image")} />
            <span><i onClick={insert} className="bi bi-trash3"></i></span>
            <button onClick={insert}>insert</button>
            <span className="errorSpan">
                {errors.image?.message}
            </span> */}
            <label htmlFor='file' className='mt-4'><h5> Add photo</h5></label>
            <div className='d-flex'>
                <div className='me-auto flex-grow-1'>
                    <input className="form-control" id="file" type="file" {...register("image")} />
                    <span className="errorSpan">
                        {errors.image?.message}
                    </span>
                </div>
                {imageUploud &&
                    <div className='p-2 mt-2 px-1' >
                        <OverlayTrigger placement='right' overlay={<Tooltip>Delete</Tooltip>}>
                            <i className="bi bi-x hoverIcon bigIcon" onClick={deleteImage} ></i>
                        </OverlayTrigger>
                    </div>
                }

            </div>
        </div>

    )
}