import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
// import StarRating from 'react-simple-star-rating';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { BASE_URL } from '../env_setup'

function VendorBooking(props) {
    // const [state, setState] = useState({ bookings: [], bookingKey: null })

    // useEffect(() => {
    //     let fetchBookings = async () => {
    //         const token = getToken()
    //         const bookings_response = await axios.get(BASE_URL + "customerbooking", { params: { customer_id: token } })
    //         // Handle errors
    //         let bookings = bookings_response.data
    //         setState({ ...state, bookings })
    //     }
    //     fetchBookings()
    // }, [])

    // const tableHeaders = ['Timeslot', 'Service', 'Service Provider', 'Address', 'City']

    // const setBookingKey = (bookingKey) => setState({ ...state, bookingKey })

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
                    {(props.booking.status == 'completed') &&
                        <Row>
                            <Col xs={3} ><text className='text-uppercase fw-bold'>Rating</text></Col>
                            <Col>
                                {(props.booking.vendor_rating != 0) ?
                                    <Rating precision={0.5} name="read-only" value={props.booking.vendor_rating} readOnly />
                                    : <Rating
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
                    {/* <hr /> 
                    <Row>
                        <Col xs={3} ><text className='text-uppercase fw-bold'>Actions</text></Col>
                        <Col><Button variant='danger'>Cancel</Button>  <Button variant='warning'>Rescehdule</Button></Col>
                    </Row>*/}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container >
    )
}

export default VendorBooking