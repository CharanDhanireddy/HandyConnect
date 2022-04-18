import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Card, Alert } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { BASE_URL } from '../../env_setup'

function Booking(props) {

    const [state, setState] = useState({ timeslotList: [], timeslot: null, showAlert: 0, showModal: true })

    let handleClose = (e) => {
        props.setBooking(null)
    }

    let updateRating = async (newRating) => {
        let newBooking = {
            booking_id: props.booking.id, rating: newRating
        };
        try {
            let bookingRes = await axios.post(BASE_URL + "customerRating", newBooking)
        }
        catch {
            console.log('Error')
        }
        props.setBooking({ ...props.booking, customer_rating: newRating })
    }

    let closeAlert = () => {
        setTimeout(() => {
            setState({ ...state, showAlert: 0 })
            props.setBooking(null)
        }, 2000)
    }

    let cancelBooking = async () => {
        let bookingDetails = {
            booking_id: props.booking.id
        };
        let data, status;
        try {
            let cancelBookingRes = await axios.delete(BASE_URL + "cancelBooking", {
                params: bookingDetails
            })
            console.log(cancelBookingRes.status)
            data = cancelBookingRes.data
            status = cancelBookingRes.status
        }
        catch (error) {
            data = error.response.data
            status = error.response.status
            console.log('Error')
        }
        closeAlert()
        let showAlert = (status == 200) ? 1 : 3
        setState({ ...state, showAlert, showModal: false })

    }

    let getRescheduleTimeslots = async () => {
        let timeslot_response = await axios.get(BASE_URL + "availability",
            {
                params: {
                    service_id: parseInt(props.booking.service_id),
                    city_id: parseInt(props.booking.city_id)
                }
            })
        setState({ ...state, timeslotList: timeslot_response.data })
    }

    let rescheduleBooking = async () => {
        let data, status;
        try {
            let res = await axios.post(BASE_URL + "rescheduleBooking", {
                booking_id: props.booking.id,
                day: state.timeslot.day,
                month: state.timeslot.month,
                year: state.timeslot.year
            })
            data = res.data
            status = res.status
            console.log(res)
        }
        catch (error) {
            data = error.response.data
            status = error.response.status
            console.log('Error', error)
        }
        closeAlert()
        let showAlert = (status == 200) ? 2 : 3
        setState({ ...state, showAlert, showModal: false })
    }

    const BookingData = props.booking ? {
        Timeslot: props.booking.month + '/' + props.booking.day + '/' + props.booking.year,
        Service: props.booking['service_name'],
        Address: props.booking['address'],
        Vendor: props.booking['vendor_name'],
    } : []

    if (props.booking.otp && props.booking.booking_status == 'Confirmed') {
        BookingData.OTP = props.booking.otp
    }

    if (props.booking.vendor_phone) {
        BookingData.VendorPhone = props.booking.vendor_phone
    }

    return (
        <Container id="booking" className='mt-4'>
            {/* Alert where 1 -> booking cancelled
            2 -> booking rescheduled
            3 -> Error */}
            {(state.showAlert > 0) && <Alert style={{ zIndex: -1 }} variant={(state.showAlert <= 2) ? "success" : "danger"}>
                <Alert.Heading>{(state.showAlert <= 2) ? "Success" : "Error"}</Alert.Heading>
                <p>
                    {(state.showAlert == 1) ?
                        "Booking cancelled!" :
                        (state.showAlert == 2) ?
                            "Booking rescheduled!" :
                            "Error while modifying the booking!"
                    }
                </p>
            </Alert>}
            <Modal
                centered
                size="lg"
                show={props.booking != null && state.showModal}>
                <Modal.Header className="booking-header">
                    Booking details
                </Modal.Header>
                <Modal.Body className="booking-font">
                    {Object.keys(BookingData)
                        // .filter(key => !key.includes('id') && !key.includes('password'))
                        .map(key => (
                            <Row data-cy={[key]}>
                                <Col xs={3} id={[key]}><text className='text-uppercase'>  {[key]} </text></Col>
                                <Col id={[key]}>{BookingData[key]}</Col>
                            </Row>
                        ))}
                    {props.booking.vendor_phone &&
                        <Row data-cy='vendor-phone'>
                            <Col xs={3} id='vendor-phone'><text className='text-uppercase'>  Contact </text></Col>
                            <Col id='vendor-phone-no'>{BookingData['VendorPhone']}</Col>
                        </Row>}
                    {(props.booking.booking_status == 'Completed') &&
                        <Row>
                            <Col xs={3} ><text className='text-uppercase fw-bold'>Rating</text></Col>
                            <Col>
                                {(props.booking.customer_rating != 0) ?
                                    <Rating precision={0.5} name="read-only" value={props.booking.customer_rating} readOnly />
                                    : <Rating
                                        data-cy='rating'
                                        name="simple-controlled"
                                        value={props.booking.customer_rating}
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
                                <Col xs={3} ><text className='text-uppercase fw-bold'>Actions</text></Col>
                                <Col>
                                    <Button variant='outline-danger'
                                        data-cy='cancelButton'
                                        onClick={cancelBooking}
                                        className="submit-reschedule-button"
                                    ><strong>Cancel</strong></Button>
                                    <Button variant={state.timeslotList.length ? 'warning' : 'outline-warning'}
                                        data-cy='rescheduleButton'
                                        onClick={getRescheduleTimeslots}
                                        className='submit-reschedule-button'
                                    > <strong>Rescehdule</strong></Button></Col>
                            </Row>
                        </>}

                    {state.timeslotList &&
                        <>
                            <hr />
                            <Row xs={1} md={2} lg={3}>
                                {state.timeslotList.map((timeslot, key) => (
                                    <Col key={key}>
                                        <Card

                                            key={key}
                                            style={{ height: '4rem', margin: '0 0.5rem 0.5rem 0', cursor: 'pointer' }}
                                            className={(timeslot == state.timeslot ? 'bg-dark text-white timeselect-card-onhover' : 'timeselect-card-onhover')}
                                            onClick={() => { setState({ ...state, timeslot: timeslot }) }}
                                        >
                                            <Card.Body data-cy={key}>
                                                <p className='text-center'>{timeslot.month + '/' + timeslot.day + '/' + timeslot.year}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            {state.timeslot &&
                                <Button variant='outline-success'
                                    data-cy='confirmRescheduleButton'
                                    onClick={rescheduleBooking}>Confirm</Button>
                            }
                        </>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-cy='closeButton' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container >
    )
}

export default Booking