import React, { useEffect, useState } from 'react'

export default function Img({ register, errors, radio }) {

    const [display, setDisplay] = useState('A')

    useEffect(() => {
        if (radio === 'A') {
            setDisplay('A')
        } else if (radio === 'B') {
            setDisplay('B')
        }
    }, [radio])

    /*  const chooseRadio = () => {
        if (radio === 'A') {
            if (imageUploud !== '') {
                return imageUploud[0]
            } else {
                return 'https://cdn.pixabay.com/photo/2015/12/03/08/50/paper-1074131_960_720.jpg'
            }
        } else if (radio === 'B') {
            if (imageLink) {
                return imageLink
            } else {
                return 'https://cdn.pixabay.com/photo/2015/12/03/08/50/paper-1074131_960_720.jpg'
            }
        }
    } */

    return (
        <>
            <div>
                <label className="form-label"><h5> Add photo</h5></label>
            </div>
            <div className='mb-2'>
                <div className='form-check form-check-inline'>
                    <input {...register("radio")} type="radio" value="A" className='form-check-input' />Upload photo

                </div>
                <div className='form-check form-check-inline'>
                    <input className='form-check-input' {...register("radio")} type="radio" value="B" />Link photo
                </div>
            </div>

            {display === 'A' &&
                <>
                    <input className="form-control" id="file" type="file" {...register("image")} />
                    <span className="errorSpan">
                        {errors.image?.message}
                    </span>
                </>
            }
            {display === 'B' &&
                <>
                    <input className="form-control" id="" type="text" {...register("imageRecipe")} placeholder="Add link photo..." />
                    <span className="errorSpan">
                        {errors.imageRecipe?.message}
                    </span>
                </>
            }
        </>
    )
}
