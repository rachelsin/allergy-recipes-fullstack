import React from 'react'

export default function Image() {
    return (
        <div>
            <div className="mb-3">
                <label for="formFileSm" className="form-label">Small file input example</label>
                <input className="form-control form-control-sm" id="formFileSm" type="file" />
            </div>
        </div>
    )
}
