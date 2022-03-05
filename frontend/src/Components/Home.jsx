import React, { Component } from "react";
import { Container } from "react-bootstrap";
import HomeJumbotron from "./HomeComponents/HomeJumbotron";
import Features from "./HomeComponents/Features";

class Home extends Component {
  render() {
    return (
      <Container>
        <HomeJumbotron />
        <Features/ >
        
      </Container>
    );
  }
}

export default Home;