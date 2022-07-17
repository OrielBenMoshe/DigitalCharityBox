import React, { useEffect, useState } from "react";
import "./App.css";
import "./assets/styles/css/main.css";
import { Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { state } from "./state";
import { PostToServer } from "./getData";

import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import PersonalDetailsForm from "./components/settings/PersonalDetailsForm";
import DisplaySettings from "./components/settings/DisplaySettings";
import CreditDetailsForm from "./components/settings/CreditDetailsForm";

function App() {
  const [detailsUsers, setDetailsUsers] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyDL8T1pMf6ZE6ZsByagJH8KD52lMSwIP2E",
    authDomain: "charityboxapp-f8611.firebaseapp.com",
    projectId: "charityboxapp-f8611",
    storageBucket: "charityboxapp-f8611.appspot.com",
    messagingSenderId: "60324429990",
    appId: "1:60324429990:web:aabdf959678fb0181af467",
    measurementId: "G-HETM9JKNL8",
  };

  initializeApp(firebaseConfig);
  const auth = getAuth();
  // state.user = detailsUsers[0];

  useEffect(() => {
    onAuthStateChanged(auth, (userForFirebase) => {
      if (userForFirebase) {
        state.UIDfirebase = userForFirebase.uid;
        PostToServer(
          `/api/userConnected/${userForFirebase.uid}`,
          {},
          setDetailsUsers
        );
      }
    });
  }, [auth]);

  return (
    <div className="App">
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
