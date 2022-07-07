import React from 'react';
import "./App.css";
import './assets/styles/css/main.css';
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import PersonalDetailsForm from "./components/settings/PersonalDetailsForm";
import DisplaySettings from "./components/settings/DisplaySettings";
import CreditDetailsForm from "./components/settings/CreditDetailsForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Signup" element={<Signup />}/>
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
