import React, { useState, useEffect } from 'react';
import { getToken } from "../../util/localStorage";
import axios from 'axios';
import { Container, Row, Table, Modal, Button } from 'react-bootstrap';
import { BASE_URL } from '../../env_setup'
import Booking from './Booking.jsx'

function Bookings(props) {
    const [state, setState] = useState({ bookings: [], booking: null })

    let statusMap = {
        Confirmed: 'Confirmed',
        In_progress: 'In progress',
        Completed: 'Completed',
        Cancelled: 'Cancelled'
    }

    let statusColourMap = {
        Confirmed: 'green',
        In_progress: 'orange',
        Completed: 'blue',
        Cancelled: 'red'
    }


    useEffect(() => {
        let fetchBookings = async () => {
            const token = getToken()
            const bookings_response = await axios.get(BASE_URL + "customerbooking", { params: { customer_id: token } })
            let bookings = bookings_response.data?.reverse()
            setState({ ...state, bookings })
        }
        fetchBookings()
    },
        [state.booking])


    const tableHeaders = ['Timeslot', 'Service',
        'Address',
        'Status',
        'Action']

    const setBooking = (booking) => setState({ ...state, booking })

    return (
        <Container id="booking-table" className='mt-4'>

            <Table responsive >
                <thead className="booking-header">
                    <tr>
                        {tableHeaders.map((header, key) => (
                            <th key={key}>{header}</th>
                        ))
                        }
                    </tr>
                </thead>
                <tbody className="booking-font">
                    {state.bookings && state.bookings.map((booking, key) => (
                        <tr key={key}>
                            <td id="booking-month">{booking.month + '/' + booking.day + '/' + booking.year}</td>
                            <td id="service-name" >{booking.service_name}</td>
                            <td id="address" >{booking.address}</td>
                            <td id="status" style={{ color: statusColourMap[booking.booking_status] }}>
                                <span data-cy={booking.month + '/' + booking.day + '/' + booking.year}>
                                    {statusMap[booking.booking_status]}
                                </span>
                            </td>
                            <td ><Button
                                variant="outline-secondary"
                                onClick={() => setBooking(booking)}
                                data-cy={booking.month + '/' + booking.day + '/' + booking.year}
                            > <strong> View/Modify Booking </strong> </Button></td>
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