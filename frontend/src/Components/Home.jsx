import React, { Component } from "react";
import { Container } from "react-bootstrap";
import HomeCarousel from "./HomeComponents/HomeCarousel";

class Home extends Component {
  render() {
    return (
      <Container>
        <HomeCarousel />
      </Container>
    );
  }
}

export default Home;