import React, { useEffect, useState } from "react";
import "./App.css";
import "./assets/styles/css/main.css";
import { Routes, Route } from "react-router-dom";

// /** Firebase */
// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

/** Valtio */
import { state } from "./state";
import { proxy, useSnapshot, subscribe } from "valtio";

import { PostToServer } from "./getData";

import Home from "./components/Home/Home";
import FirstRegistrationSteps from "./components/Signup/FirstRegistrationSteps";
import PersonalDetailsForm from "./components/settings/PersonalDetailsForm";
import DisplaySettings from "./components/settings/DisplaySettings";
import CreditDetailsForm from "./components/settings/CreditDetailsForm";

import setLocalStorage from "./setLocalStorage";

function App() {
  // const [detailsUsers, setDetailsUsers] = useState([]);
  const snap = useSnapshot(state);
  // const firebaseConfig = {
  //   apiKey: "AIzaSyDL8T1pMf6ZE6ZsByagJH8KD52lMSwIP2E",
  //   authDomain: "charityboxapp-f8611.firebaseapp.com",
  //   projectId: "charityboxapp-f8611",
  //   storageBucket: "charityboxapp-f8611.appspot.com",
  //   messagingSenderId: "60324429990",
  //   appId: "1:60324429990:web:aabdf959678fb0181af467",
  //   measurementId: "G-HETM9JKNL8",
  // };

  /** Insert the LocalStorage to the global state. */
  const initializeState = async () => {
    try {
      state.user = await setLocalStorage();
    } catch (error) {
      console.log("error:", error);
    }
  };

  // state.user = detailsUsers[0];
  // useEffect(() => {
  //   console.log("detailsUsers:", detailsUsers);
    
  //   // state.user = setLocalStorage("firebaseUID", detailsUsers[0])
  // }, [detailsUsers])

  useEffect(() => {
    initializeState();
    // initializeApp(firebaseConfig);

    // const auth = getAuth();
    // onAuthStateChanged(auth, (userForFirebase) => {
    //   if (userForFirebase) {
    //     console.log("userForFirebase:", userForFirebase);
    //     state.user.firebaseUID = userForFirebase.uid;
    //     PostToServer(
    //       `/api/userConnected/${userForFirebase.uid}`,
    //       {},
    //       setDetailsUsers
    //     );
    //   }
    // });
  }, []);

  return (
    <div className="App">
        <Routes>
          <Route path="/Signup" element={<FirstRegistrationSteps />} />
          <Route index element={<Home store={state} />} />
          <Route path="/Home" element={<Home store={state} />} />
        </Routes>
    </div>
  );
}

export default App;
