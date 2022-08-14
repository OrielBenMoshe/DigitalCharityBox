import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  deleteUser,
  EmailAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
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

const deleteCurrentUser = async () => {
  try {
    const res = await auth.currentUser.delete;
    console.log("res:", res);
  } catch (error) {
    console.log(error);
  }
}

const deleteSignedUser = async (password) => {
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    password
  )

  const result = await reauthenticateWithCredential(
    auth.currentUser,
    credential
  )

  // Pass result.user here
  await deleteUser(result.user)
 
  console.log("success in deleting")
  localStorage.removeItem("user");
}

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
      alert(err.message);
    }
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("userCredential:", userCredential);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (email, password) => {
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
      alert(err.message);
      return err.message;
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
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
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };