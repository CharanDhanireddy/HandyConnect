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

import axios from "axios";

function Signup(props) {
  const [state, setState] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: ""
    })
    const navigate = useNavigate()
  
  let onChange = e => {
    setState({...state, [e.target.name] : e.target.value})
  };

  let onSignupClick = async () => {
    const userData = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
      rePassword: state.rePassword,
    };

    let res = await axios.post("http://localhost:5000/user/signup", userData)
    let data = res.data
    let status = res.status
    console.log(data, status)
    let token = data?.user?.id ? data?.user?.id : null
    props.setToken(token)
    navigate('/')
  };

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
                  value={state.firstName}
                  onChange={onChange}
                />
                <FormControl.Feedback type="invalid"></FormControl.Feedback>
              </Form.Group>

              <Form.Group controlId="lastNameId">
                
                <Form.Control
                  className = "mb-2"
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={state.lastName}
                  onChange={onChange}
                />
                <FormControl.Feedback type="invalid"></FormControl.Feedback>
              </Form.Group>

              <Form.Group controlId="emailId">
                
                <Form.Control
                  className = "mb-2"
                  type="text"
                  name="email"
                  placeholder="Enter email address"
                  value={state.email}
                  onChange={onChange}
                />
                <FormControl.Feedback type="invalid"></FormControl.Feedback>
              </Form.Group>

              <Form.Group controlId="passwordId">
                
                <Form.Control
                  className = "mb-2"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={state.password}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="rePasswordId">
                
                <Form.Control
                  className = "mb-2"
                  type="password"
                  name="rePassword"
                  placeholder="Re-enter password"
                  value={state.rePassword}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

            </Form>
            <Button 
              className="mt-3 w-100 btn btn-lg btn" variant = "outline-primary"
              color="primary"
              onClick={onSignupClick}  
            >Sign up</Button>
            <p className="mt-2">
              Already have account? <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
}

export default Signup;