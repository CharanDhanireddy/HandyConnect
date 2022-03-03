import React, { Component } from "react";
import { Container } from "react-bootstrap";
import HomeCarousel from "./HomeComponents/HomeCarousel";
import HomeJumbotron from "./HomeComponents/HomeJumbotron";
import Features from "./HomeComponents/Features";

class Home extends Component {
  render() {
    return (
      <Container>
        <HomeJumbotron />
        <Features/ >
        {/* <HomeCarousel /> */}
      </Container>
    );
  }
}

export default Home;