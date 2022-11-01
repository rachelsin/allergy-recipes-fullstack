import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions/action';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object()
    .shape({
        email: yup.string().email().required(),
        password: yup.string().required().min(6).max(1024)
    })
    .required();

export default function Login() {
    const userId = useSelector(state => state.user.userId)
    const loginStatus = useSelector(state => state.user.login)
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    useEffect(() => {
        console.log(userId);
        if (userId) {
            navigate('/');
        }
    }, [userId]);

    const onSubmit = dataForm => {
        let data = {
            email: dataForm.email,
            password: dataForm.password
        };
        dispatch(actions.login(data))
    }
    useEffect(() => {
        dispatch(actions.setSucceededSignup(null))
    }, [])

    return (
        <>
            <div className="signupBackground">
                <div className="containerSignup">
                    <div className="divSignup">
                        <div className="">
                            <h2 className="text-center mb-4">Login</h2>
                            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" method="POST">
                                <input type="email" className="form-control" id="email" placeholder="Email"  {...register("email")} />
                                {errors.email &&
                                    <span className="errorSpan">
                                        {errors.email?.message}
                                    </span>
                                }
                                <input type="password" className="form-control mt-1" id="password" placeholder="Password"  {...register("password")} />
                                {errors.password &&
                                    <span className="errorSpan">
                                        {errors.password?.message}
                                    </span>
                                }
                                <button className="w-100 btn btn-lg textSignUp mt-3" type="submit">Login</button>
                                {loginStatus &&
                                    <div className='errorSpan mt-2'>{loginStatus}</div>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
