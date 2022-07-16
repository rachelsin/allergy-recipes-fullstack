import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown, Form, Button } from 'react-bootstrap';
import { actions } from '../../redux/actions/action';


function mapStateToProps(state) {
    return {

    };
}

const mapDispatchToProps = (dispatch) => ({


})

export default connect(mapStateToProps, mapDispatchToProps)(function NavbarTop(props) {

    function handelLogout() {
        console.log("hjv");
        localStorage.removeItem("token");
        console.log('remove');
        console.log('hi');
    }

    return (
        <>

            <Navbar bg="white" expand="lg" className="shadow-sm">
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

                        </Nav>

                        <Nav>
                            <NavLink className="nav-link" to="/signup">signup</NavLink>
                            <Navbar.Text>/</Navbar.Text>
                            <NavLink className="nav-link" to="/login">login</NavLink>
                            <div className="col-4 align-self-center">
                                <button type="button" className="btn btn-outline-secondary" onClick={handelLogout} >Logout</button>
                            </div>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
})