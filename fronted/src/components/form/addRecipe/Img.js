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

    return (


        <div>
            {/*   <div>
                <label htmlFor="file" className="form-label"><h5>Add photo</h5></label>
                <input className="form-control" id="file" type="file" {...register("image")} />
                <span className="errorSpan">
                    {errors.image?.message}
                </span>
            </div>
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
            </div> */}
            <div>
                <div>
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
                        <div>
                            <input className="form-control" id="file" type="file" {...register("image")} />
                            <span className="errorSpan">
                                {errors.image?.message}
                            </span>
                        </div>
                    }
                    {display === 'B' &&
                        <div>
                            <input className="form-control" id="" type="text" {...register("imageRecipe")} />
                            <span className="errorSpan">
                                {errors.imageRecipe?.message}
                            </span>
                        </div>
                    }
                    <div>

                    </div>
                </div>

            </div>
        </div>
    )
}
