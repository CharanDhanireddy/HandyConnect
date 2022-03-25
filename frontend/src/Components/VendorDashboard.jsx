import React, { useState, useEffect } from 'react';
import { getToken } from "../util/localStorage";
import axios from 'axios';
import { Container, Row, Table } from 'react-bootstrap';
import { BASE_URL } from '../env_setup'

function VendorDashboard(props) {
    const [state, setState] = useState({ bookings: [] })

    useEffect(() => {
        let fetchBookings = async () => {
            const token = getToken()
            const bookings_response = await axios.get(BASE_URL + "vendorbooking", { params: { vendor_id: token } })
            // Handle errors
            let bookings = bookings_response.data
            setState({ ...state, bookings })
        }
        fetchBookings()
    }, [])

    const tableHeaders = ['Timeslot', 'Service', 'Customer', 'Address', 'City']

    return (
        <Container id="booking-table" className='mt-4'>

            <Table responsive >
                <thead>
                    <tr>
                        {tableHeaders.map((header, key) => (
                            // <Row key={booking.id}> {JSON.stringify(booking)}</Row>
                            <th key={key}>{header}</th>
                        ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {state.bookings && state.bookings.map((booking, key) => (
                        // <Row key={booking.id}> {JSON.stringify(booking)}</Row>
                        <tr key={key}>
                            <td id="booking-month">{booking.month + '/' + booking.day + '/' + booking.year}</td>
                            <td id="service-name" >{booking.service_name}</td>
                            <td id="customer-name" >{booking.customer_name}</td>
                            <td id="address" >{booking.address}</td>
                            <td id="city" >{booking.city_name}</td>
                        </tr>
                    ))

                    }
                </tbody>
            </Table>
        </Container >
    )
}

export default VendorDashboard