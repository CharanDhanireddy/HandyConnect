import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from "../util/localStorage";
import { Container, Row, Col } from 'react-bootstrap';
import { BASE_URL } from '../env_setup';

function Profile(props) {
    const [state, setState] = useState({ userData: {} })

    useEffect(() => {
        let fetchData = async () => {
            let token = getToken()
            let profile_response = await axios.get(BASE_URL + "customer", { params: { customer_id: token } })
            console.log(profile_response)
            // customer response is a list with one element
            setState({ ...state, userData: profile_response.data[0] })
        }
        fetchData();
    }, [])

    return (
        <Container className='mt-3'>
            {Object.keys(state.userData).filter(key => !key.includes('id') && !key.includes('password')).map(key => (
                <Row>
                    <Col xs={3}><text className='text-uppercase fw-bold'>{[key]}</text></Col>
                    <Col>{state.userData[key]}</Col>
                </Row>
            ))}

        </Container>
    )
};

export default Profile;