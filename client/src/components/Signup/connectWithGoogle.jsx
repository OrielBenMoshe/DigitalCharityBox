import "./connectWithGoogle.css";
import  React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { state } from '../../state';

const ConnectWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  
  const login = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("signIn result:", result);
      const user = result.user;
      state.firebaseUID = user.uid  ;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="connectWithGoogle">

      <div className="google-btn" onClick={login}>
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://img.icons8.com/color/50/000000/google-logo.png"
            alt=""
          />
        </div>
        <span className="btn-text">
          <b>Sign in with Google</b>
        </span>
      </div>
    </div>
  );
};

export default ConnectWithGoogle;
