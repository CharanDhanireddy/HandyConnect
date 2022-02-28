import React, { useState } from "react";
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

import { getCity, setCity, isLoggedIn, removeUserData } from './util/localStorage'

function App() {
  const navigate = useNavigate()
  let loggedIn = isLoggedIn()
  let city = getCity()
  const [updated, setUpdated] = useState(0)

  let updateCity = (city) => {
    setCity(city);
    setUpdated(updated + 1)
  }

  let logOut = () => {
    removeUserData()
    navigate('/');
  }

  if (!loggedIn) {
    return (
      <div>
        <Header isLoggedIn={loggedIn} logOut={logOut} city={city} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vendorsignup" element={<VendorSignup />} />
          <Route path="/vendorlogin" element={<VendorLogin />} />
        </Routes>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header isLoggedIn={loggedIn} logOut={logOut} city={city} setCity={updateCity} />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/" element={<Dashboard city={city} />} />
        <Route path="/vendorDashboard" element={<VendorDashboard />} />
      </Routes>
      <Footer />
    </div>
  );

}

export default App;