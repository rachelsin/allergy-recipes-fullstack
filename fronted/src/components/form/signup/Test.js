import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import './test.css';

export default function Test() {

    const schema = yup
        .object()
        .shape({
            name: yup.string().required().min(2).max(255),
            email: yup.string().email().min(6).max(255).required(),
            password: yup.string().required().min(6).max(1024),
        })
        .required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = data => {
        console.log(data);
    }
    return (
        <div className='text-center aaa'>
            <div className='form-signin w-100 m-auto'>
                <h1 className="h3 mb-1 fw-normal">Please Sign up</h1>
                <p className="text-muted"> Sign up to add and save recipes!</p>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" method="POST">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingName" placeholder="Name"  {...register("name")} />
                        <label htmlFor="floatingName">Name</label>
                        <span className="errorSpan">
                            {errors.name?.message}
                        </span>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"  {...register("email")} />
                        <label htmlFor="floatingInput">Email address</label>
                        <span className="errorSpan">
                            {errors.email?.message}
                        </span>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  {...register("password")} />
                        <label htmlFor="floatingPassword">Password</label>
                        <span className="errorSpan">
                            {errors.password?.message}
                        </span>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary mt-4" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    )
}
