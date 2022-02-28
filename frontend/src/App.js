import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import VendorLogin from "./Components/VendorLogin.jsx";
import VendorSignup from "./Components/VendorSignup.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import Header from "./Components/Header.jsx"
import Footer from "./Components/Footer.jsx"
import Profile from "./Components/Profile.jsx"
import VendorDashboard from "./Components/VendorDashboard.jsx";
import Bookings from "./Components/Bookings.jsx";

function setToken(userToken) {
  localStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}


function App() {
  const token = getToken()
  const navigate = useNavigate()

  let logOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (!token) {
    return (
      <div>
        <Header isLoggedIn={token != null} logOut={logOut} />
        {/* <Login setToken={this.setToken}/>  */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/vendorsignup" element={<VendorSignup setToken={setToken} />} />
          <Route path="/vendorlogin" element={<VendorLogin setToken={setToken} />} />
          {/* <Route path = "/dashboard" element = {<Dashboard />} /> */}
        </Routes>
        {/* <Footer /> */}
      </div>
    )
  }

  return (
    <div>
      <Header isLoggedIn={token != null} logOut={logOut} />
      <Routes>
        {/* <Route exact path="/"  element={<Home />}/> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/profile" element={<Profile getToken={getToken} />} />
        <Route path="/bookings" element={<Bookings getToken={getToken} />} />
        <Route path="/" element={<Dashboard getToken={getToken} />} />
        <Route path="/vendorDashboard" element={<VendorDashboard getToken={getToken} />} />
      </Routes>
      <Footer />
    </div>
  );

}

export default App;