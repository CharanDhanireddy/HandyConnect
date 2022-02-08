import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Card, Modal, Form, FormControl, Button, Row, Col } from "react-bootstrap";
import axios from 'axios';

const initial_state = {
    timeslot: null,
    timeslotList: [],
    address: null,
    zipcode: null,
    errors: []
}

function TimeSelect(props) {
    const [state, setState] = useState(initial_state)
    const navigate = useNavigate()

    useEffect(() => {
        let fetchData = async () => {
            let timeslot_response = await axios.get("http://localhost:5000/availability",
                {
                    params: {
                        service: props.service,
                        city: props.city
                    }
                })
            setState({ ...state, timeslotList: timeslot_response.data.timeslots })
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

    let onSubmit = async (e) => {
        if (!isValid()) return
        // let res = await axios.post("http://localhost:5000/booking", {
        //     ...state,
        //     city: props.city,
        //     service: props.service
        // })
        // let data = res.data
        // let status = res.status

        // navigate('/')
        setState(initial_state)
        props.updateState('showToast', true)
        props.updateState('service', null)
    }

    return (
        <>
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
                            <Col xs={9}> {props.service}</Col>
                        </Row>
                        <hr />
                        <Row xs={1} md={2} lg={3}>
                            {state.timeslotList.map(timeslot => (
                                <Col>
                                    <Card
                                        key={timeslot.id}
                                        style={{ height: '4rem', margin: '0 0.5rem 0.5rem 0', cursor: 'pointer' }}
                                        // className='border'
                                        className={(timeslot.time == state.timeslot ? 'bg-dark text-white' : null)}
                                        onClick={() => { setState({ ...state, timeslot: timeslot.time }) }}
                                    >
                                        <Card.Body >
                                            <p className='text-center'>{timeslot.time}</p>
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
                                    value={props.city}
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
                    <Button variant="outline-primary"
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