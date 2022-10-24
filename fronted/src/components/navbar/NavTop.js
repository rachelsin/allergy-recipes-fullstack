import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, Dropdown, OverlayTrigger, Tooltip, DropdownButton } from 'react-bootstrap';
import { actions } from '../../redux/actions/action';
import jwtDecode from "jwt-decode";
import localStorageFunction from "../../services/localStorage";
import './nav.css'



export default function NavTop() {
    const statusLogin = useSelector(state => state.user.statusLogin)
    const id = useSelector(state => state.user.userId)

    const dispatch = useDispatch()

    const [user, setUser] = useState()
    const [userId, setUserId] = useState()

    useEffect(() => {
        const userToken = localStorageFunction.getJwt()
        if (userToken) {
            setUser(userToken);
            let id = jwtDecode(userToken)
            setUserId(id)
            dispatch(actions.setUserId(id))
        }
    }, [user, statusLogin]);

    useEffect(() => {
        if (userId) {
            dispatch(actions.getArrayFavorite())
            dispatch(actions.getMyRecipes())
        }
    }, [userId])

    return (
        <>
            <Navbar bg="white" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand>Allergy Recipes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    {/* <Navbar.Collapse id="navbarScroll"></Navbar.Collapse> */}
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="justify-content-center flex-grow-1 pe-3" navbarScroll>
                            <NavLink className="nav-link px-5 mx-1 iconNav pt-0 " to="/">

                                <div className="text-center">
                                    <i className="bi bi-house-door navIcon  mx-auto text-center"></i>
                                </div>
                                <p className="mb-0">Home</p>
                            </NavLink>

                            {user &&
                                <>
                                    <NavLink className="nav-link px-5 mx-1 iconNav pt-0" to="/add-recipe">
                                        <div className="text-center">
                                            <i className="bi bi-journal-plus navIcon"></i>
                                        </div>
                                    <p className="mb-0 fs-6">Add a Recipe</p>
                                        {/* </OverlayTrigger> */}
                                    </NavLink>
                                    <NavLink className="nav-link px-5 mx-1 iconNav pt-0" to="/my-favorites">
                                        <div className="text-center">
                                        <i className="bi bi-heart navIcon"></i>
                                        </div>
                                    <p className="mb-0 fs-8">My Favorites</p>
                                    </NavLink>

                                    {/* <NavLink className="nav-link" to="/my-favorites">My Favorites</NavLink> */}
                                </>
                            }
                        </Nav>
                        <Nav>
                            {!user &&
                                <>
                                    <span ><small className="text-muted">Sign up to add recipes<i className="bi bi-arrow-right mx-2"></i></small></span>
                                    <NavLink className="btn-sm btn mx-1 textSignUp" to="/signup"><span className=""></span>Sign Up</NavLink>
                                    <NavLink className="btn btn-sm mx-1 btn-outline-secondary" to="/login">Log in</NavLink>
                                </>
                            }
                            {user &&
                                <Dropdown
                                    align="end"
                                    className="ps-5"
                                >
                                    <Dropdown.Toggle id="dropdown-basic" variant="white">
                                        <i className="bi bi-person-circle bigIcon "></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {/* <Dropdown.Item> */}
                                        <NavLink className="cancelUnderline" to="/my-recipes"> <Dropdown.Item>My Recipes</Dropdown.Item></NavLink>
                                        {/* </Dropdown.Item> */}
                                        <Dropdown.Divider />

                                        <NavLink className="cancelUnderline" to="/logout"><Dropdown.Item>logout</Dropdown.Item></NavLink>

                                    </Dropdown.Menu>
                                </Dropdown>
                                // <Navbar.Brand></Navbar.Brand>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}