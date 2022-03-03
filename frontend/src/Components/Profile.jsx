import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from "../util/localStorage";
import { Container, Row, Col } from 'react-bootstrap';
import { BASE_URL } from '../constants';

function Profile(props) {
    const [state, setState] = useState({ userData: {} })

    useEffect(() => {
        let fetchData = async () => {
            let token = getToken()
            let profile_response = await axios.get(BASE_URL + "profile", { params: { id: token } })
            console.log(profile_response)
            setState({ ...state, userData: profile_response.data })
        }
        fetchData();
    }, [])

    return (
        <Container className='mt-3'>
            {Object.keys(state.userData).map(key => (
                <Row>
                    <Col xs={3}><text className='text-uppercase fw-bold'>{[key]}</text></Col>
                    <Col>{state.userData[key]}</Col>
                </Row>
            ))}

        </Container>
    )
};

export default Profile;