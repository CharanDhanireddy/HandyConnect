import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";
import { setUserData } from "../util/localStorage";
import axios from "axios";
import { BASE_URL } from "../env_setup";

function VendorLogin(props) {
  const [state, setState] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  let onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  let onLoginClick = async () => {
    const vendorData = {
      email: state.email,
      password: state.password
    };

    let res = await axios.post(BASE_URL + "vendor/login", vendorData)
    let data = res.data
    let status = res.status
    console.log(data, status)

    setUserData(data && data.vendor ? data?.vendor : null)
    if (data?.vendor)
      navigate('/vendorDashboard')
    else
      navigate('/')
    // if(data == null)
    // Show Error
    // else
    // redirect to Homepage - with City selection popUp
  };

  return (
    <Container className="center" >
      <Row>
        <Col className="mx-auto" md="4 pt-10">
          <h1 className="login-signup-heading">Service Provider Login</h1>
          <Form>
            <Form.Group controlId="emailId" className="loginpage-email-field">
              <Form.Control
                className="loginpage-email-field mb-2"
                type="text"
                name="email"
                placeholder="Email"
                value={state.email}
                onChange={onChange}
              />
              <FormControl.Feedback type="invalid"></FormControl.Feedback>
            </Form.Group>

            <Form.Group className="loginpage-password-field" controlId="passwordId">
              <Form.Control

                type="password"
                name="password"
                placeholder="Password"
                value={state.password}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Button id="vendor-login-button" className="mt-3 w-100 btn btn-lg btn" variant="outline-dark" color="primary" onClick={onLoginClick}>Login</Button>
          <p className="mt-2">
            Don't have account? <Link to="/vendorsignup">Signup</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}


export default VendorLogin;