import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        userName: state.user.user.userName,
    };
}

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(actions.login(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {

    const navigate = useNavigate();

    useEffect(() => {
        if (props.userName) {
            navigate('/');
        }
    }, [props.userName]);

    const passwordRef = useRef('');
    const emailRef = useRef('');
    const nameRef = useRef('');

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            await props.login(data);

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
                            <h1 className="text-center">Login</h1>
                            {/* <p className="text-muted"> You can open new account for free!</p> */}
                            <form onSubmit={handleSubmit} autoComplete="off" method="POST">
                                <input type="email" className="form-control" id="email" placeholder="Email" ref={emailRef} />
                                <input type="password" className="form-control mt-1" id="password" placeholder="Password" ref={passwordRef} />
                                <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})
