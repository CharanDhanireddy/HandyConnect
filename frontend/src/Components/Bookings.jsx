import React, { useState, useEffect } from 'react';
import { getToken } from "../util/localStorage";
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';

function Bookings(props) {
    const [state, setState] = useState({ bookings: [] })

    useEffect(() => {
        let fetchBookings = async () => {
            const token = getToken()
            const bookings_response = await axios.get("http://localhost:5000/bookings", { params: { userId: token } })
            // Handle errors
            let bookings = bookings_response.data.bookings
            setState({ ...state, bookings })
        }
        fetchBookings()
    }, [])

    return (
        <Container className='mt-4'>
            {state.bookings.map((booking) => (
                <Row key={booking.id}> {JSON.stringify(booking)}</Row>
            ))
            }
        </Container >
    )
}

export default Bookings