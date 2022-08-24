import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  RecaptchaVerifier,
  deleteUser,
  EmailAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signOut,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import { message } from "antd";
import setLocalStorage from "./setLocalStorage";

const firebaseConfig = {
  apiKey: "AIzaSyDL8T1pMf6ZE6ZsByagJH8KD52lMSwIP2E",
  authDomain: "charityboxapp-f8611.firebaseapp.com",
  projectId: "charityboxapp-f8611",
  storageBucket: "charityboxapp-f8611.appspot.com",
  messagingSenderId: "60324429990",
  appId: "1:60324429990:web:aabdf959678fb0181af467",
  measurementId: "G-HETM9JKNL8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const recaptchaVerifier = new RecaptchaVerifier(
//   "sign-in-button",
//   {
//     size: "invisible",
//     callback: (response) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//      console.log(response);
//     },
//   },
//   auth
// );
// const appVerifier = window.recaptchaVerifier;

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: process.env.REACT_APP_DEV_URL + "Signup/verified=true",
  // This must be true.
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  // dynamicLinkDomain: process.env.REACT_APP_DEV_URL+"Signup/verified=true"
};

const verificationViaEmailLink = async (email) => {
  try {
    const res = await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    setLocalStorage("emailForSignIn", email);
    console.log("האימות דרך המייל הצליח!", res);
  } catch (error) {
    console.error(error);
    console.log(error.code);
    const errorCode = error.code;
    message.warning(error.message);
  }
};

const deleteCurrentUser = async () => {
  try {
    const res = await auth.currentUser.delete;
    console.log("res:", res);
  } catch (error) {
    console.log(error);
  }
};

const deleteSignedUser = async (password) => {
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    password
  );

  const result = await reauthenticateWithCredential(
    auth.currentUser,
    credential
  );

  // Pass result.user here
  await deleteUser(result.user);

  console.log("success in deleting");
  localStorage.removeItem("user");
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    return user;
    //   const q = query(collection(db, "users"), where("uid", "==", user.uid));
    //   const docs = await getDocs(q);
    //   if (docs.docs.length === 0) {
    //     await addDoc(collection(db, "users"), {
    //       uid: user.uid,
    //       name: user.displayName,
    //       authProvider: "google",
    //       email: user.email,
    //     });
    //   }
  } catch (err) {
    console.error(err);
    err.message.includes("email-already-in-use")
      ? message.warning(
          "מצטערים, כתובת המייל הזאת כבר בשימוש. רוצים לנסות להתחבר לחשבון קיים?"
        )
      : message.warning(err.message);
    return err.message;
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log("userCredential:", userCredential);
    return userCredential;
  } catch (err) {
    console.error(err);

    if (err.message.includes("user-not-found")) {
      message.warning("מצטערים, כתובת המייל הזאת לא קיימת אצלינו במערכת.");
    } else if (err.message.includes("wrong-password")) {
      message.warning("הסיסמה שהזנת שגויה.");
    } else return err.message;
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  // const verificated = verificationViaEmailLink(email);
  // return
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log("registerUser:", user);
    return res;
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name,
    //     authProvider: "local",
    //     email,
    //   });
  } catch (err) {
    console.error(err);
    err.message.includes("email-already-in-use")
      ? message.warning(
          "לא נרשמת כבר? כתובת המייל הזו כבר בשימוש.."
        )
      : message.warning(err.message);
    return err.message;
  }
};

// const registerWithPhoneNumber = async (phoneNumber) => {
//   try {
//     const confirmationResult = await signInWithPhoneNumber(
//       auth,
//       phoneNumber,
//       recaptchaVerifier
//     );
//     // SMS sent. Prompt user to type the code from the message, then sign the
//     // user in with confirmationResult.confirm(code).
//     window.confirmationResult = confirmationResult;
//     return confirmationResult;
//   } catch (err) {
//     console.error(err);
//     recaptchaVerifier.render().then(function(widgetId) {
//       recaptchaVerifier.reset(widgetId);
//     });
//     return err.message;
//   }
// };

// const signInWithVerificationCode = async (code, confirmationResult) => {
//   try {
//     const result = await confirmationResult.confirm(code);
//      // User signed in successfully.
//     const user = result.user;
//     return user;
//   } catch (err) {
//     console.error(err);
//      // User couldn't sign in (bad verification code?)
//      return err.message;
//   }
// }

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    message.success("נשלח למייל קישור לאיפוס סיסמה!");
  } catch (err) {
    console.error(err);
    message.warning(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  deleteCurrentUser,
  deleteSignedUser,
  signInWithGoogle,
  // signInWithVerificationCode,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  // registerWithPhoneNumber,
  sendPasswordReset,
  // verificationViaEmailLink,
  logout,
};
