import React, { useState } from 'react'

export default function Image(props) {
    const { image, setImage } = props;

    const fileOnChange = (event) => {
        console.log(event.target.value);
        setImage(event.target.files[0]);
        console.log(image);

    }
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">Small file input example</label>
                <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={fileOnChange} />
            </div>
        </div>
    )
}
