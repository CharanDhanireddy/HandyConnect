import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavLink, Modal, Form, Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../env_setup";
import HandyconnectLogo from "../Images/h.png"

function Header(props) {
    const [state, setState] = useState({ city: props.city?.city_id, cityList: [], showModal: false })

    useEffect(() => {
        let fetchData = async () => {
            let city_response = await axios.get(BASE_URL + "cities")
            setState({ ...state, cityList: city_response.data })
        }
        if (state.showModal) fetchData();
    }, [state.showModal])


    const handleSubmit = () => {
        // check if city not null
        if (state.city) {
            props.setCity({
                city_id: state.city,
                city_name: state.cityList.find(city => city.city_id == state.city).city_name
            })
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
                    <Navbar.Brand id="header-handyconnect" className="py-4" href="/">
                        <img
                            src={HandyconnectLogo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Nav className="ml-auto" >
                        {props.isLoggedIn ?
                            (props.city ? (
                                <>
                                    <Navbar.Brand id="locationSelectId" onClick={() => { setState({ ...state, showModal: true }) }}>
                                        <img
                                            alt=""
                                            src="/location.svg"
                                            width="30"
                                            height="30"
                                            className="d-inline-block align-top"
                                        />{props.city?.city_name}
                                    </Navbar.Brand>

                                    <Nav.Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>Book a service</Nav.Link>
                                    <Nav.Link href="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>Profile</Nav.Link>
                                    <Nav.Link href="/bookings" className={`nav-item ${isActive('/bookings') ? 'active' : ''}`}>Bookings</Nav.Link>
                                    <NavLink onClick={() => props.logOut()}>Log out</NavLink>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/vendorDashboard" className={`nav-item ${isActive('/vendorDashboard') ? 'active' : ''}`}>Dashboard</Nav.Link>
                                    <Nav.Link href="/vendorProfile" className={`nav-item ${isActive('/vendorProfile') ? 'active' : ''}`}>Profile</Nav.Link>
                                    <NavLink onClick={() => props.logOut()}>Log out</NavLink>
                                </>
                            ))
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
                                <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
                            ))}
                        </Form.Select>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="citySelectCancelId" variant="secondary" onClick={handleClose}>Close</Button>
                    <Button id="citySubmitId" variant="primary" disabled={!state.city} onClick={handleSubmit}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Header;