import React from "react";
import {Navbar, Nav, NavLink} from "react-bootstrap";
import {Container} from "react-bootstrap";

function Header(props){
    const isLoggedIn = props.isLoggedIn
    console.log(isLoggedIn)
    return(
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/home">HandyConnect</Navbar.Brand>
                <Nav className="ml-auto" >
                {isLoggedIn ? 
                (
                    <>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <NavLink onClick={() => props.logOut()}>Log out</NavLink>
                    </>
                )
                :(
                    <>
                        <Nav.Link className = "ml-auto" href="/login">Vendor Login</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </>
                )}
            </Nav>
        </Container>
    </Navbar>
    )
}

export default Header;