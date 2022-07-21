import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';

function mapStateToProps(state) {
    return {
        // token: state.public_reducer.token,
    };
}

const mapDispatchToProps = (dispatch) => ({
    addUser: (data) => dispatch(actions.signup(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Signup(props) {

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
        }
    }

    return (
        <>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 m-auto">
                            <div className="center">
                            <h1 className='text-center'>Sign up</h1>
                                <p className="text-muted"> You can open new account for free!</p>
                                <form onSubmit={handleSubmit} autoComplete="off" method="POST">
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

