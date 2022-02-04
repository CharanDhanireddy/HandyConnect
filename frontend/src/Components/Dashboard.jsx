import React, { Component } from "react";
import { Container, Card, Modal, Form, Button} from "react-bootstrap";
import axios from "axios";

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            cityList: null,
            city: null,
            showModal: true,
            serviceList: null
        }
    }

    async componentDidMount(){
        let res = await axios.get("http://localhost:5000/city")
        let data = res.data
        let status = res.status
        console.log(data, status)
        this.setState({cityList: data.cities})
    }

    async componentDidUpdate(_prevProps, prevState){
        if(this.state.city !== prevState.city){
            let res = await axios.get("http://localhost:5000/service", {
                params: {
                    city: this.state.city
                }
            })
        let data = res.data
        this.setState({serviceList: data.services})
        }
    }

    handleClose = () => {
        // check if city not null
        if(this.state.city)
            this.setState({showModal: false})
    }

    render() {
        const {city, cityList, serviceList, showModal} = this.state;
        if(!cityList)return null
        return (
        <Container>
            <h3>Select a service from the following</h3>
            {serviceList ? (
                <Container>
                {serviceList.map(service => (<Card key={service.id}>{service.name}</Card>) )}
                </Container>
            ) : (null)}

            <Modal
                show={showModal}
                // WHY
                // onHide={handleClose}
                backdrop="static"
                
                // WHY
                // keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Select a city</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Select
                         onChange={(e) => {console.log('here');this.setState({city: e.target.value})}}
                        >
                            <option value={null}>Select</option>
                            {cityList.map(city => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                            ))}
                        </Form.Select>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" disabled={!city} onClick={this.handleClose}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        );
    }
}

export default Dashboard;