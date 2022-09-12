import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import './signup.css'

function mapStateToProps(state) {
    return {
        succeededSignup: state.user.signup,
        errorSignup: state.user.errorSignup,
    };
}

const mapDispatchToProps = (dispatch) => ({
    addUser: (data) => dispatch(actions.signup(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Signup(props) {
    const navigate = useNavigate();
    const { succeededSignup, errorSignup } = props;

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
            toast.error('not seccese ,try again', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, [succeededSignup])

    const onSubmit = dataForm => {
        let data = {
            email: dataForm.email,
            password: dataForm.password,
            name: dataForm.name
        };
        props.addUser(data);
    }

    return (
        <>
            <div className="signupBackground">
                <div className="containerSignup">
                    <div className="divSignup">
                        <div className="">
                            <h2 className='text-center'>Sign up</h2>
                            <p className="text-muted"> Sign up to add and save recipes!</p>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

