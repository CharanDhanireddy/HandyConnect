import React, { useState, useEffect } from 'react';
import { getToken } from "../../util/localStorage";
import axios from 'axios';
import { Container, Row, Table, Modal, Button } from 'react-bootstrap';
import { BASE_URL } from '../../env_setup'
import Booking from './Booking.jsx'

function Bookings(props) {
    const [state, setState] = useState({ bookings: [], booking: null })

    let statusMap = {
        confirmed: 'Confirmed',
        in_progress: 'In progress',
        completed: 'Completed',
        cancelled: 'Cancelled'
    }

    useEffect(() => {
        let fetchBookings = async () => {
            const token = getToken()
            const bookings_response = await axios.get(BASE_URL + "customerbooking", { params: { customer_id: token } })
            // Handle errors
            let bookings = bookings_response.data
            setState({ ...state, bookings })
        }
        fetchBookings()
    },
        // can reduce number of API calls by using another state variable 
        [state.booking])


    const tableHeaders = ['Timeslot', 'Service',
        // 'Service Provider', 
        'Address',
        // 'City',
        'Status',
        'Action']

    const setBooking = (booking) => setState({ ...state, booking })

    return (
        <Container id="booking-table" className='mt-4'>

            <Table responsive >
                <thead className = "booking-header">
                    <tr>
                        {tableHeaders.map((header, key) => (
                            // <Row key={booking.id}> {JSON.stringify(booking)}</Row>
                            <th key={key}>{header}</th>
                        ))
                        }
                    </tr>
                </thead>
                <tbody className = "booking-font">
                    {state.bookings && state.bookings.map((booking, key) => (
                        // <Row key={booking.id}> {JSON.stringify(booking)}</Row>
                        <tr key={key}>
                            <td id="booking-month">{booking.month + '/' + booking.day + '/' + booking.year}</td>
                            <td id="service-name" >{booking.service_name}</td>
                            {/* <td id="vendor-name" >{booking.vendor_name}</td> */}
                            <td id="address" >{booking.address}</td>
                            {/* <td id="city" >{booking.city_name}</td> */}
                            <td id="status" >{statusMap[booking.status]}</td>
                            <td ><Button variant="outline-secondary" onClick={() => setBooking(booking)}> <strong> View/Modify Booking </strong> </Button></td>
                        </tr>
                    ))

                    }
                </tbody>
            </Table>
            {(state.booking != null) && <Booking booking={state.booking} setBooking={setBooking} />}
        </Container >
    )
}

export default Bookings