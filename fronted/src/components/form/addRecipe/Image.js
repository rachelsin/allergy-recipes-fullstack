import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


export default function Image({ register, errors, insert }) {

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
            <div className='row'>
                <div className='col-md-11'>
                    <input className="form-control" id="file" type="file" {...register("image")} />
                    <span className="errorSpan">
                        {errors.image?.message}
                    </span>
                </div>
                <div className='col-md-1 px-1 ' >
                    <OverlayTrigger placement='right' overlay={<Tooltip>Delete Photo</Tooltip>}>
                        <i className="bi bi-trash3 hoverIcon" onClick={insert}></i>
                    </OverlayTrigger>
                </div>
            </div>
        </div>

    )
}