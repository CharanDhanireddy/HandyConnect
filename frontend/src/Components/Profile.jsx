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
            setState({ ...state, userData: profile_response.data })
        }
        fetchData();
    }, [])

    return (
        <div className='user-profile-details'>
            <h3 className='mb-3 mt-4'>{state.userData['first_name']} {state.userData['last_name']}</h3>
            <table className = "profile-table">
                <tr>
                 <th>City</th>
                 <td>{state.userData['city_name']}</td>   
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>{state.userData['phone']}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{state.userData['email']}</td>
                </tr>
            </table>

        </div>
    )
};

export default Profile;