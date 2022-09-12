import React, { useState } from 'react'
import { useForm } from "react-hook-form";


export default function AddImage2() {
    const [image, setImage] = useState('');
    const { register, handleSubmit } = useForm();

    const handleChange = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }
    // fetch
    const handleApi = () => {
        var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var formdata = new FormData();
        formdata.append("image", image);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:5001/api/image", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    const onSubmit = data => {
        console.log(data.image[0]);
    }


    return (
        <div>
            IMAGE UPLOAD
            <input
                type="file"
                // onChange={handleChange}
                {...register("image")}
            /> <br />
            <button onClick={handleSubmit(onSubmit)} >SUBMIT</button>
        </div>
    )
}
