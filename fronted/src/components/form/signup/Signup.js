import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import { useNavigate } from "react-router-dom";


import { toast } from 'react-toastify';

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

    useEffect(() => {
        if (succeededSignup === true) {
            toast.success('succeeded! lets Go to Login  !', {
                position: toast.POSITION.TOP_RIGHT
            });
            setTimeout(() => navigate('/login'), 6000)
        } else if (succeededSignup === false) {
            toast.success(errorSignup.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, [succeededSignup])


    const passwordRef = useRef('');
    const emailRef = useRef('');
    const nameRef = useRef('');

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value
        };
        console.log(data);
        try {
            await props.addUser(data);

        } catch (err) {
            console.log('error', err);
            toast.success(err, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    return (
        <>
            <div className="signupBackground">
                <div className="containerSignup">
                    <div className="divSignup">
                        <div className="">
                            <h2 className='text-center'>Sign up</h2>
                            <p className="text-muted"> Sign up to add and save recipes!</p>
                            <form onSubmit={handleSubmit} autoComplete="off" method="POST" className='letterSpacing5'>
                                <input type="email" className="form-control" id="email" placeholder="Email" ref={emailRef} />
                                <input type="password" className="form-control mt-1" id="password" placeholder="Password" ref={passwordRef} />
                                <input type="name" className="form-control mt-1" id="name" placeholder="Name" ref={nameRef} />
                                <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

