import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeCarousel from "./HomeComponents/HomeCarousel";

class Home extends Component {
  render() {
    return (
      <Container>
        <HomeCarousel />
        {/* <h1>Home</h1>
        <p>
          <Link to="/login/">Login</Link>
        </p>
        <p>
          <Link to="/signup">Sign up</Link>
        </p>
        <p>
          <Link to="/dashboard">Dashboard</Link>
        </p> */}
      </Container>
    );
  }
}

export default Home;