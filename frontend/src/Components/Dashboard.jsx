import React, { Component } from "react";
import { Container, Card, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";
import TimeSelect from "./TimeSelect";
import { BASE_URL } from "../env_setup";

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            serviceList: null,
            service: null,
            showToast: false
        }
    }

    async getServices(city) {
        let res = await axios.get(BASE_URL + "services", {
            params: {
                city_id: city["city_id"]
            }
        })
        return res?.data
    }

    async componentDidMount() {
        let serviceList = await this.getServices(this.props.city)
        this.setState({ serviceList })
    }


    async componentDidUpdate(prevProps) {
        if (this.props.city !== prevProps.city) {
            let serviceList = await this.getServices(this.props.city)
            this.setState({ serviceList })
        }
    }

    handleClose = () => {
        // check if city not null
        if (this.state.city)
            this.setState({ showModal: false })
    }

    updateState = (key, value) => {
        this.setState({ [key]: value })
    }

    render() {
        const { service, serviceList, showToast } = this.state;
        if (!this.props.city) return null
        return (
            <Container id="dashboardContainerId">
                {serviceList ? (
                    <>
                        <h2 className='text-center dashboard-header'>Select a service</h2>
                        <hr className="dashboard-line"></hr>
                        <Container className='mt-4'>
                            <Row xs={2} md={3} lg={4}>
                                {serviceList.map((service, key) => (
                                    <Col key={key} className = "card-onhover">
                                        <Card 
                                            id={service.service_name}
                                            key={service.service_id}
                                            style={{ height: '6rem', margin: '0 1rem 1rem 0', cursor: 'pointer' }}
                                            className='bg-dark text-white border'
                                            onClick={() => { this.setState({ service: service }) }}
                                        >
                                            <Card.Body className='mx-auto'>
                                                <h3 className='dashboard-card-text '>{service.service_name}</h3>
                                            </Card.Body>
                                            {/* <Button size="sm" variant="outline-primary">Select</Button> */}
                                        </Card>
                                    </Col>
                                )
                                )}
                            </Row>
                        </Container>
                    </>
                ) : (null)}

                {service && <TimeSelect updateState={this.updateState} service={service} city={this.props.city} />}


                {/* To update later */}
                <ToastContainer position="top-start">
                    <Toast className="d-inline-block m-1" bg='light' show={showToast}
                        // delay={3000} 
                        autohide>
                        <Toast.Body
                        // className={variant === 'Dark' && 'text-white'}
                        >
                            Booking Successful!
                        </Toast.Body>
                    </Toast>
                </ToastContainer>

            </Container>
        );
    }
}

export default Dashboard;