import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from "../util/localStorage";
import { Container, Row, Col, Card } from 'react-bootstrap';
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

        <div>
                    {/* <Container className='mt-3 vendor-profile-details'>
            {Object.keys(state.vendorData).filter(key => !key.includes('id') && !key.includes('password')).map(key => (
                <Row className = "key-vendor-profile-details" data-cy={[key]}>
                    <Col xs={3} id={[key]}><text className='text-uppercase fw-bold'>{[key]}</text></Col>
                    <Col id={[key]}>{state.vendorData[key]}</Col>
                </Row>
            ))}
        </Container> */}
        
        <div className='vendor-profile-details'>
            <h3 className='mb-3'>{state.vendorData['first_name']} {state.vendorData['last_name']}</h3>
            <table className = "profile-table">
                <tr>
                 <th>City</th>
                 <td>{state.vendorData['city_name']}</td>   
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>{state.vendorData['phone']}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{state.vendorData['email']}</td>
                </tr>
                <tr>
                    <th>Service</th>
                    <td>{state.vendorData['service_name']}</td>
                </tr>
            </table>

        </div>

        </div>


        

    )
};

export default VendorProfile;