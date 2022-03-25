import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from "../util/localStorage";
import { Container, Row, Col } from 'react-bootstrap';
import { BASE_URL } from '../env_setup';

function VendorProfile(props) {
    const [state, setState] = useState({ vendorData: {} })

    useEffect(() => {
        let fetchData = async () => {
            let token = getToken()
            let profile_response = await axios.get(BASE_URL + "vendor", { params: { vendor_id: token } })
            console.log(profile_response)
            // customer response is a list with one element
            setState({ ...state, vendorData: profile_response.data })
        }
        fetchData();
    }, [])

    return (
        <Container className='mt-3'>
            {Object.keys(state.vendorData).filter(key => !key.includes('id') && !key.includes('password')).map(key => (
                <Row data-cy={[key]}>
                    <Col xs={3} id={[key]}><text className='text-uppercase fw-bold'>{[key]}</text></Col>
                    <Col id={[key]}>{state.vendorData[key]}</Col>
                </Row>
            ))}
        </Container>
    )
};

export default VendorProfile;