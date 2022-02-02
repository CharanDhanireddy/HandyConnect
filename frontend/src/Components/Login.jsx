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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLoginClick = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log("Login " + userData.email + " " + userData.password);
  };
  render() {
    return (
      <Container className = "center" >
        <Row>
          <Col className = "mx-auto" md="4 pt-10">
            <h1 className = "login-signup-heading">Login</h1>
            <Form>
              <Form.Group controlId="emailId" className = "loginpage-email-field">
                <Form.Control
                  className="loginpage-email-field mb-2"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <FormControl.Feedback type="invalid"></FormControl.Feedback>
              </Form.Group>

              <Form.Group className = "loginpage-password-field" controlId="passwordId">
                <Form.Control
                  
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Form>
            <Button className="mt-3 w-100 btn btn-lg btn" variant = "outline-dark"  color="primary" onClick={this.onLoginClick}>Login</Button>
            <p className="mt-2">
              Don't have account? <Link to="/signup">Signup</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;