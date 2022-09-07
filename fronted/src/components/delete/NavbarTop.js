import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { actions } from '../../redux/actions/action';

import localStorageFunction from "../../services/localStorage";

import './nav.css'

const mapStateToProps = (state) => {
    return {
        userName: state.user.user.userName,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setRemoveUser: () => dispatch(actions.setRemoveUser()),
    getDataUser: (userId) => dispatch(actions.getDataUser(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function NavbarTop(props) {
    const { userName } = props;
    const [user, setUser] = useState()
    const [userId, setUserId] = useState()


    useEffect(() => {
        const data = localStorageFunction.getCurrentUser()
        if (data) {
            setUserId(data.id)
            if (userId) {
                props.getDataUser(userId)
            }
        }

    }, []);

    useEffect(() => {
        const userToken = localStorageFunction.getJwt()
        setUser(userToken);
    }, [user, userName]);

    function handelLogout() {
        localStorageFunction.logout()
        setUser(null)
        props.setRemoveUser()
    }

    return (
        <>
            <Navbar bg="white" expand="lg" className="shadow-sm bg-l">
                <Container>
                    <Navbar.Brand>Allergy Recipes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavLink className="nav-link" to="/">Home</NavLink>
                            <NavLink className="nav-link" to="/addRecipe">Add a Recipe</NavLink>

                        </Nav>

                        <Nav>
                            {!user &&
                                <>
                                    <NavLink className="nav-link" to="/signup">signup</NavLink>
                                    <Navbar.Text>/</Navbar.Text>
                                    <NavLink className="nav-link" to="/login">login</NavLink>
                                </>
                            }

                            {user &&
                                <>
                                    <Navbar.Text className="mx-2">Hi,{userName} </Navbar.Text>
                                    <div className="col-4 align-self-center">
                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handelLogout} >Logout</button>
                                    </div>
                                </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
})