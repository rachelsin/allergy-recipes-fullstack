import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import './signup.css'

export default function Signup() {
    const succeededSignup = useSelector(state => state.user.signup)
    const errorsSignup = useSelector(state => state.user.errorsSignup)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const schema = yup
        .object()
        .shape({
            email: yup.string().email().required(),
            password: yup.string().required().min(6).max(1024),
            name: yup.string().required().min(2).max(255)
        })
        .required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (succeededSignup === true) {
            toast.success('succeeded! lets Go to Login  !', {
                position: toast.POSITION.TOP_RIGHT
            });
            setTimeout(() => navigate('/login'), 6000)
        } else if (succeededSignup === false) {
          /*   toast.error('not seccese ,try again', {
                position: toast.POSITION.TOP_RIGHT
            }); */
            console.log('w');
        }
    }, [succeededSignup])

    const onSubmit = dataForm => {
        let data = {
            email: dataForm.email,
            password: dataForm.password,
            name: dataForm.name
        };
        dispatch(actions.signup(data))
    }

    return (
        <>
            <div className="signupBackground">
                <div className="containerSignup">
                    <div className="divSignup">
                        <div className="">
                            <h2 className='text-center'>Sign up</h2>
                            <p className="text-muted text-center"> Sign up to add recipes!</p>
                            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" method="POST" className='letterSpacing5'>
                                <input type="email" className="form-control" id="email" placeholder="Email"{...register("email")} />
                                {errors.email &&
                                    <span className="errorSpan">
                                        {errors.email?.message}
                                    </span>
                                }
                                <input type="password" className="form-control mt-1" id="password" placeholder="Password" {...register("password")} />
                                {errors.password &&
                                    <span className="errorSpan">
                                        {errors.password?.message}
                                    </span>
                                }
                                <input type="name" className="form-control mt-1" id="name" placeholder="Name" {...register("name")} />
                                {errors.name &&
                                    <span className="errorSpan">
                                        {errors.name?.message}
                                    </span>
                                }
                                <button className="w-100 btn btn-lg  textSignUp mt-3" type="submit">Sign up</button>
                                {errorsSignup &&
                                    <div className='errorSpan mt-2'>{errorsSignup}</div>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

