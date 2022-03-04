import React, { useState, useEffect } from 'react';
import { getToken } from "../util/localStorage";
import axios from 'axios';
import { Container, Row, Table } from 'react-bootstrap';
import { BASE_URL } from '../env_setup'

function Bookings(props) {
    const [state, setState] = useState({ bookings: [] })

    useEffect(() => {
        let fetchBookings = async () => {
            const token = getToken()
            const bookings_response = await axios.get(BASE_URL + "customerbooking", { params: { customer_id: token } })
            // Handle errors
            let bookings = bookings_response.data
            setState({ ...state, bookings })
        }
        fetchBookings()
    }, [])

    const tableHeaders = ['Timeslot', 'Service', 'Service Provider', 'Address', 'City']

    return (
        <Container className='mt-4'>

            <Table responsive>
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
                    {state.bookings.map((booking, key) => (
                        // <Row key={booking.id}> {JSON.stringify(booking)}</Row>
                        <tr key={key}>
                            <td>{booking.month + '/' + booking.day + '/' + booking.year}</td>
                            <td>{booking.service_name}</td>
                            <td>{booking.vendor_name}</td>
                            <td>{booking.address}</td>
                            <td>{booking.city_name}</td>
                        </tr>
                    ))

                    }
                </tbody>
            </Table>
        </Container >
    )
}

export default Bookings