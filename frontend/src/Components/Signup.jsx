import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastname: "",
      email: "",
      password: "",
      rePassword: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSignupClick = () => {
    const userData = {
      firstName: this.state.firstName,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      rePassword: this.state.rePassword,
    };
    console.log("Sign up " + userData.firstName + " " + userData.lastname + " " + userData.email + " " + userData.password);
  };

  render() {
    return (
      <Container className="center">
        <Row className = "">
          <Col md="4" className="mx-auto ">
            <h1 className="login-signup-heading">Sign up</h1>
            <Form>
            <Form.Group controlId="firstNameId">
                
                <Form.Control
                  className = "mb-2"
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
                <FormControl.Feedback type="invalid"></FormControl.Feedback>
              </Form.Group>

              <Form.Group controlId="lastNameId">
                
                <Form.Control
                  className = "mb-2"
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
                <FormControl.Feedback type="invalid"></FormControl.Feedback>
              </Form.Group>

              <Form.Group controlId="emailId">
                
                <Form.Control
                  className = "mb-2"
                  type="text"
                  name="email"
                  placeholder="Enter email address"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <FormControl.Feedback type="invalid"></FormControl.Feedback>
              </Form.Group>

              <Form.Group controlId="passwordId">
                
                <Form.Control
                  className = "mb-2"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.password}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="rePasswordId">
                
                <Form.Control
                  className = "mb-2"
                  type="password"
                  name="rePassword"
                  placeholder="Re-enter password"
                  value={this.rePassword}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

            </Form>
            <Button 
              className="mt-3 w-100 btn btn-lg btn" variant = "outline-primary"
              color="primary"
              onClick={this.onSignupClick}  
            >Sign up</Button>
            <p className="mt-2">
              Already have account? <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Signup;