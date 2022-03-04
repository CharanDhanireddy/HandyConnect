import React, { useState, useEffect } from "react";
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
import { BASE_URL } from "../env_setup"

function VendorSignup(props) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    service: "",
    city: "",
    email: "",
    password: "",
    rePassword: "",
    cityList: [],
    serviceList: []
  })
  const navigate = useNavigate()

  useEffect(() => {
    let fetchData = async () => {
      let city_response = await axios.get(BASE_URL + "city")
      let service_response = await axios.get(BASE_URL + "service")
      setState({ ...state, cityList: city_response.data.cities, serviceList: service_response.data.services })
    }
    fetchData();
  }, [])

  let onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  let onSignupClick = async () => {
    const vendorData = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
      rePassword: state.rePassword,
    };

    let res = await axios.post(BASE_URL + "vendor/signup", vendorData)
    let data = res.data
    let status = res.status
    console.log(data, status)
    // let token = data?.vendor?.id ? data?.vendor?.id : null
    setUserData(data?.vendor)
    navigate('/vendorDashboard')
  };

  return (
    <Container className="center">
      <Row className="">
        <Col md="4" className="mx-auto ">
          <h1 className="login-signup-heading">Service Provider Signup</h1>
          <Form>
            <Form.Group controlId="firstNameId">

              <Form.Control
                className="mb-2"
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
                className="mb-2"
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={state.lastName}
                onChange={onChange}
              />
              <FormControl.Feedback type="invalid"></FormControl.Feedback>
            </Form.Group>

            <Form.Group controlId="cityId">
              <Form.Select className="mb-2"
                onChange={(e) => { setState({ ...state, city: e.target.value }) }}
              >
                <option value={null}>Select</option>
                {state.cityList.map(city => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="serviceId">
              <Form.Select className="mb-2"
                onChange={(e) => { setState({ ...state, service: e.target.value }) }}
              >
                <option value={null}>Select</option>
                {state.serviceList.map(service => (
                  <option key={service.id} value={service.name}>{service.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="emailId">

              <Form.Control
                className="mb-2"
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
                className="mb-2"
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
                className="mb-2"
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
            className="mt-3 w-100 btn btn-lg btn" variant="outline-primary"
            color="primary"
            onClick={onSignupClick}
          >Sign up</Button>
          <p className="mt-2">
            Already have account? <Link to="/vendorlogin">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default VendorSignup;