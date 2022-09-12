import React, { useEffect, useState } from 'react'

export default function AddImage() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');

    const [data, setData] = useState(null)

    const handleChange = (e) => {
        // console.log(e.target.files[0])
        setImage(e.target.files[0])
    }
    const handleName = e => {
        setName(e.target.value)
    }
    // fetch
    const handleApi = () => {
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("image", image);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:5001/addImage", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch(`http://localhost:5001/getImages`)
            .then((response) => response.json())
            .then((result) => {
                setData(result);
            })
            .catch(error => console.log('error', error));
    }, [image, name])

    console.log(data);

    return (
        <div>
            <div>
                <img
                    src="https://assets.digitalocean.com/articles/alligator/css/object-fit/example-object-fit.jpg"
                    width="600"
                    height="337"
                    style={{ width: '600px', height: '337px', }}
                    alt="Sample image of a turtle riding on top of an alligator that is swimming in the water - scaled to 600 x 337."
                />
            </div>
            <div>
                <img
                    src="https://assets.digitalocean.com/articles/alligator/css/object-fit/example-object-fit.jpg"
                    width="600"
                    height="337"
                    style={{ width: '300px', height: '337px', objectFit: 'fill' }}
                    alt="Sample image of a tutle riding on top of an alligator that is swimming in the water - scaled to 300 x 337."
                />
            </div>
            <div className='m-5'>
                Name
                <input placeholder='name' onChange={handleName} />
                <br />
                IMAGE UPLOAD
                <input type="file" onChange={handleChange} /> <br />
                <button onClick={handleApi} >SUBMIT</button>
            </div>

            <div className='row'>
                {data !== null &&
                    // <p>{data.images[0].name}</p>
                    data?.images.map(item => (
                        <div className='col-3' >
                            <p className=''> {item.name} </p>
                            <br />
                            <img className='img-thumbnail' src={`http://localhost:5001/${item.image}`} width="200"
                                height="200"
                                style={{ width: '200px', height: '230px', objectFit: 'cover' }} />
                        </div>
                    ))

                }
            </div>
        </div>
    )
}
