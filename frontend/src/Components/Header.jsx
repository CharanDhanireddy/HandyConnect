import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavLink, Modal, Form, Button } from "react-bootstrap";

import { Container } from "react-bootstrap";
import axios from "axios";

function Header(props) {
    const [state, setState] = useState({ city: props.city, cityList: [], showModal: false })

    useEffect(() => {
        let fetchData = async () => {
            let city_response = await axios.get("http://localhost:5000/city")
            setState({ ...state, cityList: city_response.data.cities })
        }
        if (state.showModal) fetchData();
    }, [state.showModal])


    const handleSubmit = () => {
        // check if city not null
        if (state.city) {
            props.setCity(state.city)
            setState({ ...state, showModal: false })
        }
    }

    const handleClose = () => {
        setState({ ...state, showModal: false })
    }

    const isActive = (ref) => {
        return (window.location.pathname === ref)
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand id="header-handyconnect" className="py-4" href="/home">HandyConnect</Navbar.Brand>
                    <Nav className="ml-auto" >
                        {props.isLoggedIn ?
                            (
                                <>
                                    <Navbar.Brand onClick={() => { setState({ ...state, showModal: true }) }}>
                                        <img
                                            alt=""
                                            src="/location.svg"
                                            width="30"
                                            height="30"
                                            className="d-inline-block align-top"
                                        />{props.city}
                                    </Navbar.Brand>

                                    <Nav.Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>Book a service</Nav.Link>
                                    <Nav.Link href="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>Profile</Nav.Link>
                                    <Nav.Link href="/bookings" className={`nav-item ${isActive('/bookings') ? 'active' : ''}`}>Bookings</Nav.Link>
                                    <NavLink onClick={() => props.logOut()}>Log out</NavLink>
                                </>
                            )
                            : (
                                <>
                                    <Nav.Link className="ml-auto" href="/vendorlogin"
                                        className={`nav-item ${isActive('/vendorlogin') ? 'active' : ''}`}>
                                        Vendor Login
                                    </Nav.Link>
                                    <Nav.Link href="/login"
                                        className={`nav-item ${isActive('/login') ? 'active' : ''}`}>
                                        Login
                                    </Nav.Link>
                                </>
                            )}
                    </Nav>
                </Container>
            </Navbar>

            <Modal
                show={state.showModal}
                backdrop="static"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Select a city</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Select
                            id="citySelectId"
                            onChange={(e) => { setState({ ...state, city: e.target.value }) }}
                        >
                            <option value={null}>Select</option>
                            {state.cityList.map(city => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                            ))}
                        </Form.Select>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button id="citySubmitId" variant="primary" disabled={!state.city} onClick={handleSubmit}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Header;