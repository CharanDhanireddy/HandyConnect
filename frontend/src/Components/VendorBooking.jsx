import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
// import StarRating from 'react-simple-star-rating';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { BASE_URL } from '../env_setup'

function VendorBooking(props) {
    const [state, setState] = useState({ otp: '', errors: {} })

    let onChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    };

    let handleEndService = async () => {
        let bookingData = { id: props.booking.id }
        let data, status;
        try {
            let endRes = await axios.post(BASE_URL + "endService", null, { params: bookingData })
            data = endRes.data
            status = endRes.status
            if (status == 200) {
                console.log('Completed the service!')
            }
            else {
                console.log('Error while ending service', data, status)
            }
        }
        catch (error) {
            data = error.response.data
            status = error.response.status
            console.log(error)
        }
    }

    // To
    let handleOTPSubmit = async () => {
        let newBooking = {
            id: props.booking.id, otp: parseInt(state.otp)
        };
        // Can improve error handling here
        let data, status;
        try {
            let otpRes = await axios.post(BASE_URL + "startService", null, { params: newBooking })
            data = otpRes.data
            status = otpRes.status
            if (status == 200) {
                console.log('OTP correct and status updated')
                props.setBooking({ ...props.booking, booking_status: 'In-Progress' })
            }
            else {
                console.log('OTP wrong')
                setState({ ...state, errors: { otp: 'Wrong OTP' } })
            }
        }
        catch (error) {
            data = error.response.data
            status = error.response.status
            console.log(error)
            setState({ ...state, errors: { otp: 'Wrong OTP' } })
        }

    }

    let handleClose = (e) => {
        props.setBooking(null)
    }

    let updateRating = async (newRating) => {
        let newBooking = {
            booking_id: props.booking.id, vendor_rating: newRating
        };
        // Can improve error handling here
        try {
            let bookingRes = await axios.post(BASE_URL + "vendorRating", newBooking)
            if (bookingRes.data.vendor_rating == newBooking.vendor_rating) {
                console.log('Rating updated')
            }
        }
        catch {
            console.log('Error')
        }
        props.setBooking({ ...props.booking, vendor_rating: newRating })
    }

    const BookingData = props.booking ? {
        Timeslot: props.booking.month + '/' + props.booking.day + '/' + props.booking.year,
        Service: props.booking['service_name'],
        Address: props.booking['address'],
        // City: props.booking['city_name'],
        Customer: props.booking['customer_name'],
    } : []

    if (props.booking.customer_phone) {
        BookingData.CustomerPhone = props.booking.customer_phone
    }

    return (
        <Container id="booking" className='mt-4'>
            <Modal
                centered
                size="lg"
                show={props.booking != null}>
                <Modal.Header className="booking-header">
                    Booking details
                </Modal.Header>
                <Modal.Body className="booking-font">
                    {Object.keys(BookingData)
                        // .filter(key => !key.includes('id') && !key.includes('password'))
                        .map(key => (
                            <Row data-cy={[key]}>
                                <Col xs={3} id={[key]}><text className='text-uppercase fw-bold'>{[key]}</text></Col>
                                <Col id={[key]}>{BookingData[key]}</Col>
                            </Row>
                        ))}

                    {props.booking.customer_phone &&
                        <Row data-cy='customer-phone'>
                            <Col xs={3} id='customer-phone'><text className='text-uppercase'>  Contact </text></Col>
                            <Col id='customer-phone-no'>{BookingData['CustomerPhone']}</Col>
                        </Row>}

                    {(props.booking.booking_status == 'Completed') &&
                        <Row>
                            <Col xs={3} ><text className='text-uppercase fw-bold'>Rating</text></Col>
                            <Col>
                                {(props.booking.vendor_rating != 0) ?
                                    <Rating precision={0.5} name="read-only" value={props.booking.vendor_rating} readOnly />
                                    : <Rating
                                        data-cy='rating'
                                        name="simple-controlled"
                                        value={props.booking.vendor_rating}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            updateRating(newValue)
                                        }}
                                    />
                                }
                            </Col>
                        </Row>
                    }
                    {(props.booking.booking_status == 'Confirmed') &&
                        <>
                            <hr />
                            <Row>
                                <Col xs={3} ><text className='text-uppercase fw-bold'>Enter OTP to start:</text></Col>
                                <Col>
                                    <Form noValidate >
                                        <FormGroup controlId="otpId"
                                        // className="mb-2"
                                        >
                                            <FormControl
                                                // className="mb-2"
                                                type="text"
                                                name="otp"
                                                placeholder="Enter OTP"
                                                value={state.otp}
                                                onChange={onChange}
                                                isInvalid={state.errors.otp}
                                            />
                                            <FormControl.Feedback type="invalid">
                                                {state.errors.otp}
                                            </FormControl.Feedback>
                                        </FormGroup>
                                    </Form>
                                </Col>
                                <Col xs={3}>
                                    <Button
                                        // variant={state.timeslotList.length ? 'warning' : 'outline-warning'}
                                        data-cy='submitOTPButton'
                                        onClick={handleOTPSubmit}
                                    // className='submit-OTP-button'
                                    > <strong>Submit</strong></Button></Col>
                            </Row>
                        </>}
                    {(props.booking.booking_status == 'In-Progress') &&
                        <>
                            <Row>
                                <Col xs='3'> <text className='text-uppercase fw-bold'>Action </text></Col>
                                <Col><Button variant='danger' onClick={handleEndService}>
                                    <strong> End Service </strong>
                                </Button></Col>
                            </Row>
                        </>}


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container >
    )
}

export default VendorBooking