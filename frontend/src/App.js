import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";



class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/"  element={<Home />}/>
            <Route path="/signup" element={<Signup />} />
            <Route path = "/login" element = {<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;