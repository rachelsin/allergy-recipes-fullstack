import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown, Form, Button } from 'react-bootstrap';
import { actions } from '../../redux/actions/action';

import './nav.css'
const mapStateToProps = (state) => {
    return {
        userName: state.user.user.userName,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setRemoveUser: () => dispatch(actions.setRemoveUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(function NavbarTop(props) {
    const { userName } = props;
    // console.log(userName);

    function handelLogout() {
        localStorage.removeItem("token");
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
                            <NavLink className="nav-link" to="/createRecipe">Add a recipe</NavLink>
                            {/* <NavLink className="nav-link" to="/add">Add</NavLink> */}

                        </Nav>

                        <Nav>
                            {!userName &&
                                <>
                                    <NavLink className="nav-link" to="/signup">signup</NavLink>
                                    <Navbar.Text>/</Navbar.Text>
                                    <NavLink className="nav-link" to="/login">login</NavLink>
                                </>
                            }

                            {userName &&
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