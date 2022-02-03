import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import Dashboard from "./Components/Dashboard.jsx";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/"  element={<Home />}/>
            <Route path="/signup" element={<Signup />} />
            <Route path = "/login" element = {<Login />} />
            <Route path = "/dashboard" element = {<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;