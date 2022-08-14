import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

import { Input, Spin, Modal, Form, Button } from "antd";

/** Valtio */
import { state } from "../../state";

/** Firebase Authetication */
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  deleteSignedUser,
  logInWithEmailAndPassword
} from "../../firebase";

import { GetData } from "../../serverRequests";
import setLocalStorage from "../../setLocalStorage";

import Login from "../Login/Login";

export default function Register({ next, setUserDetails }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UserRegisteredInDB, setUserRegisteredInDB] = useState();
  const [firebaseUser, setFirebaseUser] = useState();
  // const [user, loading, error] = useAuthState(auth); // Check if the account user exist in firebase DB.
  const navigate = useNavigate();

  useEffect(() => {
    // יש לבדוק אם יש בזיכרון סיסמא ומייל לבדוק אם משתמש רשום ואם לא נמצא במונגו יש למחוק אותו
   
  }, [])

  const onFinish = (values) => {
    console.log('Success:', values);
    registerToFirebase(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const registerToFirebase = async ({email, password}) => {
    const response = await registerWithEmailAndPassword(email, password);
    console.log('response:', response);
    
    /** 
     * Check if user not exist in the DB
     * and if successfully registered in Firebase.
     * */
    if (response.user) {
      setLocalStorage("temporaryEmailPassword", { email, password })
      const firebaseUser = response.user;
      console.log("Yess");
        /** 
         * If the Firebase User is not exists in DB
         * we create new user in Firebase, and stores details
         * in state and go to the next step.
         */
        setUserDetails({
          firebaseUID: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email
        })
        next();
      } else {
        /** 
         * If the Firebase User exists in the DB, 
         * the LocalStorage is updated from the DB 
         * And the Global State is updated from it. 
         * */
        // setLocalStorage("user", UserRegisteredInDB)
        //   .then((userFromStorage) => {
        //     state.user = userFromStorage;
        //     openRegisteredUserModal();
        //   });
    }
  };

  // const currentFirebaseUser = async () => {
  //   try {
  //     const user = auth;
  //     console.log(user);
  //     // setFirebaseUser()
  //   } catch (error) {
      
  //   }
  // }
  
  

  // /** Login Modal */
  // const handleOk = () => {
  //   // refLoginForm.current.submit();
  //   // setIsModalVisible(false);
  // };
  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };
  // /** End */

  // /** Opens a modal that informs that the user is registered 
  //  * and automatically moves him to the home page. 
  //  * */
  // const openRegisteredUserModal = () => {
  //   let secondsToGo = 3.5;
  //   const modal = Modal.success({
  //     title: 'איזה כיף! אתם כבר רשומים אצלנו',
  //     content: 'אנחנו מעבירים אתכם ישר לקופת הצדקה הדיגיטלית שלכם.',
  //   });
  //   // modal.okButtonProps = false;
  //   setTimeout(() => {
  //     navigate('/');
  //     modal.destroy();
  //   }, secondsToGo * 1000);
  // };

  

  const handleSignInWithGoogleBtn = () => {
    const googleUser = signInWithGoogle();
  }





  // useEffect(() => {
  //   UserRegisteredInDB && console.log("UserRegisteredInDB:", UserRegisteredInDB);
  //   if (user && !UserRegisteredInDB) {
  //     console.log("יש משתמש בפיירבייס אבל לא במסד נתונים");
  //     deleteSignedUser()
  //   }
  // }, [UserRegisteredInDB])

  /** Check if Firebase user exist in the DB */
  // useEffect(() => {
  //   user && console.log("user:", user);
  //   user && GetData(`/api/findUser/${user.uid}`, setUserRegisteredInDB);
  // }, [user]);


  return (
        <div className="settings Register">
          <div className='headers'>
            <h1>הרשמה</h1>
            <h3>בואו נכניס אתכם למאגר התורמים שלנו</h3>
          </div>
          <Form
            name="FirebaseRegisterForm"
            initialValues={{
              remember: true,
              // email: user && user.email,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="email"
              rules={[
                {
                  required: true,
                  message: 'חלק מתהליך הרישום זה להזין את המייל שלך..',
                },
              ]}
            >
              <Input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="דואר אלקטרוני"
              />
            </Form.Item>
            <Form.Item name="password"
              rules={[
                {
                  required: true,
                  message: 'שכחת להזין סיסמה',
                },
              ]}
            >
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                placeholder="סיסמה"
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" size="large">
                רשום אותי
              </Button>
            </Form.Item>
            <Button type="primary" onClick={handleSignInWithGoogleBtn} size="large" className="googleRegisterBtn">
              רוצה להירשם עם Google
            </Button>
            {/* <div>
              כבר יש לכם חשבון? <Button type="link" onClick={showModal} style={{ padding: 0, width: "revert" }}>התחברו</Button> כעת.
            </div> */}
          </Form>
          {/* <Modal title="כניסת רשומים" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Login />
          </Modal> */}
        </div>
  );
}
