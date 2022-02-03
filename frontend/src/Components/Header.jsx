import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Container} from "react-bootstrap";



function Header(){
    return(
        
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">HandyConnect</Navbar.Brand>
                <Nav className="ml-auto" >
                <Nav.Link className = "ml-auto" href="/login">Login</Nav.Link>
                <Nav.Link  href="/signup">Signup</Nav.Link>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
    )
}

export default Header;