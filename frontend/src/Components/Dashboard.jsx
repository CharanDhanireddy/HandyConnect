import React, { Component } from "react";
import { Container, Card, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";
import TimeSelect from "./TimeSelect";
import { BASE_URL } from "../constants";

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
        let res = await axios.get(BASE_URL + "service", {
            params: {
                city
            }
        })
        return res?.data?.services
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
                        <h2 className='text-center'>Select a service from the following</h2>
                        <Container className='mt-4'>
                            <Row xs={2} md={3} lg={4}>
                                {serviceList.map((service, key) => (
                                    <Col key={key}>
                                        <Card
                                            id={service.name}
                                            key={service.id}
                                            style={{ height: '6rem', margin: '0 1rem 1rem 0', cursor: 'pointer' }}
                                            className='bg-dark text-white border'
                                            onClick={() => { this.setState({ service: service.name }) }}
                                        >
                                            <Card.Body className='mx-auto'>
                                                <h3 className='text-center'>{service.name}</h3>
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

                <TimeSelect updateState={this.updateState} service={service} city={this.props.city} props={this.props} />


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