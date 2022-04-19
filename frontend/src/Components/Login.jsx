import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl,
  Alert
} from "react-bootstrap";
import { setUserData } from "../util/localStorage";
import axios from "axios";
import { BASE_URL } from '../env_setup'

function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {},
    showAlert: false
  })
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

  let redirect = status => {
    setTimeout(() => {
      if (status == 200)
        navigate('/')
      else
        setState({ ...state, showAlert: 0 })
    }, 1200);
  }

  let onLoginClick = async () => {
    if (!isValid()) return
    const userData = {
      email: state.email,
      password: state.password
    };
    let data, status
    try {
      let res = await axios.post(BASE_URL + "customerLogin", userData)
      data = res.data
      status = res.status
    }
    catch (error) {
      data = error.response.data
      status = error.response.status
    }
    console.log(data, status)
    // Can use the errors state to show errors from the api
    redirect(status)
    let showAlert = 2
    if (status == 200) {
      showAlert = 1
      setUserData(data ? data : null)
    }
    setState({ ...state, showAlert })

    // navigate('/')
  };

  return (
    <Container className="center" >

      {(state.showAlert > 0) && <Alert variant={(state.showAlert == 1) ? "success" : "danger"}>
        <Alert.Heading>{(state.showAlert == 1) ? "Successful" : "Error"}</Alert.Heading>
        <p>
          {(state.showAlert == 1) ?
            "You have successfully logged in to Handyconnect" :
            "Wrong email or password"
          }
        </p>
      </Alert>}

      <Row>
        <Col className="mx-auto" md="4 pt-10">
          <h1 className="login-signup-heading">Login</h1>
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
              <FormControl.Feedback type="invalid">
                {state.errors.email}
              </FormControl.Feedback>
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
              <Form.Control.Feedback type="invalid">
                {state.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Button id="user-login-button" className="mt-3 w-100 btn btn-lg btn" variant="outline-dark" color="primary" onClick={onLoginClick}>Login</Button>
          <p className="mt-2">
            Don't have account? <Link to="/signup">Signup</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}


export default Login;