import React, { Component } from "react";
import { Container } from "react-bootstrap";
import HomeCarousel from "./HomeComponents/HomeCarousel";
import HomeJumbotron from "./HomeComponents/HomeJumbotron";
import Abcd from "./HomeComponents/Abcd";

class Home extends Component {
  render() {
    return (
      <Container>
        <HomeJumbotron />
        <Abcd/ >
        {/* <HomeCarousel /> */}
      </Container>
    );
  }
}

export default Home;