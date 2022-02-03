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
      <Container>
        <Row>
          <Col md="4">
            <h1>Sign up</h1>
            <Form>
            <Form.Group controlId="firstNameId">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
                <FormControl.Feedback type="invalid"></FormControl.Feedback>
              </Form.Group>

              <Form.Group controlId="lastNameId">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
                <FormControl.Feedback type="invalid"></FormControl.Feedback>
              </Form.Group>

              <Form.Group controlId="emailId">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Enter email address"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <FormControl.Feedback type="invalid"></FormControl.Feedback>
              </Form.Group>

              <Form.Group controlId="passwordId">
                <Form.Label>Your password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.password}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="rePasswordId">
                <Form.Label>Your password</Form.Label>
                <Form.Control
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