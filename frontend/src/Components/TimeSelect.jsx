import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Card, Modal, Form, FormControl, Button, Row, Col, Alert } from "react-bootstrap";
import axios from 'axios';
import { BASE_URL } from '../env_setup';
import { getToken } from '../util/localStorage';

const initial_state = {
    timeslot: null,
    timeslotList: [],
    address: null,
    zipcode: null,
    errors: [],
    showAlert: 0
}

function TimeSelect(props) {
    const [state, setState] = useState(initial_state)
    const navigate = useNavigate()

    useEffect(() => {
        let fetchData = async () => {
            let timeslot_response = await axios.get(BASE_URL + "availability",
                {
                    params: {
                        service_id: props.service?.service_id,
                        city_id: props.city?.city_id
                    }
                })
            setState({ ...initial_state, timeslotList: timeslot_response.data })
        }
        fetchData();
    }, [props.service])

    let onChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    };

    let isValid = () => {
        let errors = {}
        if (!state.timeslot) errors['timeslot'] = 'Required'
        if (!state.address) errors['address'] = 'Required'
        if (!state.zipcode) errors['zipcode'] = 'Required'
        setState({ ...state, errors })
        if (Object.keys(errors).length === 0) return true;
        else return false;
    }


    let handleClose = (e) => {
        setState(initial_state)
        props.updateState('service', null)
    }

    let redirect = status => {
        setTimeout(() => {
            if (status == 200)
                navigate('/bookings')
            else
                setState({ ...state, showAlert: 0 })
        }, 3000);
    }

    let onSubmit = async (e) => {
        if (!isValid()) return
        let data, status;
        try {
            let res = await axios.post(BASE_URL + "booking", {
                city_id: parseInt(props.city.city_id),
                service_id: props.service.service_id,
                customer_id: getToken(),
                day: state.timeslot.day,
                month: state.timeslot.month,
                year: state.timeslot.year,
                address: state.address + ' ' + props.city.city_name + ' ' + state.zipcode,
                // to change
                vendor_id: 6
            })
            data = res.data
            status = res.status
        }
        catch (error) {
            data = error.response.data
            status = error.response.status
        }
        redirect(status)
        let showAlert = (status == 200) ? 1 : 2
        setState({ ...state, showAlert })
        // navigate('/')
        // setState(initial_state)
        // props.updateState('showToast', true)
        props.updateState('service', null)
    }

    return (
        <>
            {(state.showAlert > 0) && <Alert variant={(state.showAlert == 1) ? "success" : "danger"}>
                <Alert.Heading>{(state.showAlert == 1) ? "Success" : "Error"}</Alert.Heading>
                <p>
                    {(state.showAlert == 1) ?
                        "Booking created! You are being redirected to Login Page" :
                        "Same service cannot be booked twice for the same location and date!"
                    }
                </p>
            </Alert>}
            <Modal
                size="lg"
                show={props.service}
                backdrop="static"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title className='text-center'>Select a timeslot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container >
                        <Row>
                            <Col> Selected Service: </Col>
                            <Col xs={9}> {props.service?.service_name}</Col>
                        </Row>
                        <hr />
                        <Row xs={1} md={2} lg={3}>
                            {state.timeslotList.map((timeslot, key) => (
                                <Col key={key}>
                                    <Card

                                        key={key}
                                        style={{ height: '4rem', margin: '0 0.5rem 0.5rem 0', cursor: 'pointer' }}
                                        // className='border'
                                        className={(timeslot == state.timeslot ? 'bg-dark text-white' : null)}
                                        onClick={() => { setState({ ...state, timeslot: timeslot }) }}
                                    >
                                        <Card.Body data-cy={key}>
                                            <p className='text-center'>{timeslot.month + '/' + timeslot.day + '/' + timeslot.year}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <span className='text-danger'>{state.errors.timeslot}</span>
                        <hr />
                        <Form>
                            <Form.Group controlId="addressId" className="timeSelect-address-field">
                                <Form.Control
                                    className="timeSelect-address-field mb-2"
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={state.address}
                                    onChange={onChange}
                                    isInvalid={state.errors.address}
                                />
                                <FormControl.Feedback type="invalid">{state.errors.address}</FormControl.Feedback>
                            </Form.Group>

                            <Form.Group controlId="cityId" className="timeSelect-city-field">
                                <Form.Control
                                    className="timeSelect-city-field mb-2"
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={props.city?.city_name}
                                    disabled={true}
                                />
                                <FormControl.Feedback type="invalid"></FormControl.Feedback>
                            </Form.Group>

                            <Form.Group controlId="zipcodeId" className="timeSelect-zipcode-field">
                                <Form.Control
                                    className="timeSelect-zipcode-field mb-2"
                                    type="text"
                                    name="zipcode"
                                    placeholder="Zip Code"
                                    value={state.zipcode}
                                    onChange={onChange}
                                    isInvalid={state.errors.zipcode}
                                />
                                <FormControl.Feedback type="invalid">{state.errors.zipcode}</FormControl.Feedback>
                            </Form.Group>

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button
                        id="submitId"
                        variant="outline-primary"
                        // disabled={!(state.timeslot & state.zipcode & state.address)}
                        onClick={onSubmit}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TimeSelect