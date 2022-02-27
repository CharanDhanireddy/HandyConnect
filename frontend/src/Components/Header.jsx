import React from "react";
import { Navbar, Nav, NavLink } from "react-bootstrap";
import { Container } from "react-bootstrap";

function Header(props) {
    const isLoggedIn = props.isLoggedIn
    // console.log(isLoggedIn)
    console.log(window.location.pathname);

    const isActive = (ref) => {
        return (window.location.pathname === ref)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand id = "header-handyconnect" className="py-4" href="/home">HandyConnect</Navbar.Brand>
                <Nav className="ml-auto" >
                    {isLoggedIn ?
                        (
                            <>
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
    )
}

export default Header;