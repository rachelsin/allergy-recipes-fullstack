import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { actions } from '../../redux/actions/action';
import jwtDecode from "jwt-decode";

import localStorageFunction from "../../services/localStorage";

import './nav.css'

const mapStateToProps = (state) => {
    return {
        userName: state.user.user.userName,
    };
}

const mapDispatchToProps = (dispatch) => ({
    // setRemoveUser: () => dispatch(actions.setRemoveUser()),
    // getDataUser: (userId) => dispatch(actions.getDataUser(userId)),
    setUserId: (id) => dispatch(actions.setUserId(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function NavTop(props) {
    const { userName } = props;
    const [user, setUser] = useState()
    const [userId, setUserId] = useState()

    useEffect(() => {
        const userToken = localStorageFunction.getJwt()
        if (userToken) {
            setUser(userToken);
            let id = jwtDecode(userToken)
            setUserId(id)
            props.setUserId(id)
        }
    }, [user, userName]);

    return (
        <>
            <Navbar bg="white" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand>Allergy Recipes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto" style={{ maxHeight: '100px' }} navbarScroll>
                            <NavLink className="nav-link" to="/">Home</NavLink>
                            {user &&
                                <NavLink className="nav-link" to="/addRecipe">Add a Recipe</NavLink>
                            }
                        </Nav>
                        <Nav>
                            {!user &&
                                <>
                                    <span ><small className="text-muted">Sign up to add and save recipes<i className="bi bi-arrow-right mx-2"></i></small></span>
                                    <NavLink className="btn-sm btn mx-1 textSignUp" to="/signup"><span className=""></span>Sign Up</NavLink>
                                    <NavLink className="btn btn-sm mx-1 btn-outline-secondary" to="/login">Log in</NavLink>
                                </>
                            }
                            {user &&
                                <NavLink className="btn btn-sm btn-outline-secondary" to="/logout">logout</NavLink>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
})