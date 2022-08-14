import React, { useEffect, useState } from "react";
import "./App.css";
import "./assets/styles/css/main.css";
import { Routes, Route, useNavigate } from "react-router-dom";

/** Valtio */
import { state } from "./state";
import { useSnapshot } from "valtio";

/** Components */
import Home from "./components/Home/Home";
import FirstRegistrationSteps from "./components/Home/FirstRegistrationSteps";

function App() {
  const snap = useSnapshot(state);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Home store={state} snap={snap}/>} />
        <Route
          path="/Signup"
          element={<FirstRegistrationSteps store={state} snap={snap}/>}
        />
        <Route path="/Home" element={<Home store={state} snap={snap}/>} />
      </Routes>
    </div>
  );
}

export default App;
