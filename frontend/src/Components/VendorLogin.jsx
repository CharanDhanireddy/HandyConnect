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
import { setVendorData } from "../util/localStorage";
import axios from "axios";
import { BASE_URL } from "../env_setup";

function VendorLogin(props) {
  const [state, setState] = useState({ email: "", password: "", errors: {}  })
  const navigate = useNavigate()

  let onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  let isValid = () => {
    console.log('here')
    let errors = {}
    const email_pattern = /\S+@\S+/
    if (!state.email) {
      errors['email'] = 'Required'
    }
    else if (!email_pattern.test(String(state.email).toLowerCase())) {
      errors['email'] = 'Provide a valid email address'
    }
    if (!state.password) {
      errors['password'] = 'Required'
    }
    else if (state.password.length < 8) {
      errors['password'] = 'Atleast 8 characters'
    }
    setState({ ...state, errors })
    if (Object.keys(errors).length === 0) return true;
    else return false;
  }


  // let onLoginClick = async () => {
  //   const vendorData = {
  //     email: state.email,
  //     password: state.password
  //   };

  //   let res = await axios.post(BASE_URL + "vendorLogin", vendorData)
  //   let data = res.data
  //   let status = res.status
  //   console.log(data, status)

  //   setVendorData(data ? data : null)
  //   if (data)
  //     navigate('/vendorDashboard')
  //   else
  //     navigate('/')
  //   // if(data == null)
  //   // Show Error
  //   // else
  //   // redirect to Homepage - with City selection popUp
  // };

  let onLoginClick = async () => {
    if (!isValid()) return
    const vendorData = {
      email: state.email,
      password: state.password
    };

    let res = await axios.post(BASE_URL + "vendorLogin", vendorData)
    let data = res.data
    let status = res.status
    console.log(data, status)
    // if(status != 200) ? this.
    setVendorData(data ? data : null)
    navigate('/vendorDashboard')
  };


  return (
    <Container className="center" >
      <Row>
        <Col className="mx-auto" md="4 pt-10">
          <h1 className="login-signup-heading">Service Provider Login</h1>
          <Form noValidate>
            <Form.Group controlId="emailId" className="loginpage-email-field">
              <Form.Control
                className="loginpage-email-field mb-2"
                type="text"
                name="email"
                placeholder="Email"
                value={state.email}
                onChange={onChange}
                isInvalid={state.errors.email}
              />
              <FormControl.Feedback type="invalid"></FormControl.Feedback>
              {state.errors.email}
            </Form.Group>

            <Form.Group className="loginpage-password-field" controlId="passwordId">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={state.password}
                onChange={onChange}
                isInvalid={state.errors.password}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              {state.errors.password}
            </Form.Group>
          </Form>
          <Button id="vendor-login-button" className="mt-3 w-100 btn btn-lg btn" variant="outline-dark" color="primary" onClick={onLoginClick}>Vendor Login</Button>
          <p className="mt-2">
            Don't have account? <Link to="/vendorsignup">Vendor Signup</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}


export default VendorLogin;