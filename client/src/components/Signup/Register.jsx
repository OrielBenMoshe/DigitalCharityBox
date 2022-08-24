import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input, Spin, Modal, Form, Button, Divider } from "antd";

/** Firebase Authetication */
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  deleteSignedUser,
  logInWithEmailAndPassword
} from "../../firebase";

import setLocalStorage from "../../setLocalStorage";

import Login from "../Login/Login";

export default function Register({ next, setUserDetails }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [UserRegisteredInDB, setUserRegisteredInDB] = useState();
  const [firebaseUser, setFirebaseUser] = useState();
  const emailRegisterRef = useRef(null);

  useEffect(() => {
    emailRegisterRef.current.focus();
  }, [])

  const onFinish = (values) => {
    console.log('Success:', values);
    registerToFirebase(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const registerToFirebase = async ({ email, password }) => {
    const response = await registerWithEmailAndPassword(email, password);
    console.log('response:', response);

    /** 
     * Check if user not exist in the DB
     * and if successfully registered in Firebase.
     * */
    if (response && response.user) {
      setLocalStorage("temporaryEmailPassword", { email, password })
      const firebaseUser = response.user;
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



  /** Login Modal */
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  /** End */

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
              type: 'email',
              message: 'חלק מתהליך הרישום זה להזין את המייל שלך..',
            },
          ]}
        >
          <Input placeholder="דואר אלקטרוני" ref={emailRegisterRef}/>
        </Form.Item>
        <Form.Item name="password"
          rules={[
            {
              required: true,
              message: 'שכחת להזין סיסמה',
            },
          ]}
        >
          <Input.Password placeholder="סיסמה" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" size="large">
            רשום אותי
          </Button>
        </Form.Item>
        {/* <Button type="primary" onClick={handleSignInWithGoogleBtn} size="large" className="googleRegisterBtn">
          אני רוצה להירשם עם Google
        </Button> */}
      </Form>

      <div className="login-container">
        <Divider>כבר רשומים?</Divider>
        <Button size="large" onClick={showModal} >התחברו כאן</Button>
        <Modal 
          className="login-modal"
          title="כניסה לרשומים" 
          visible={isModalVisible} 
          onCancel={handleCancel}
          width={365} 
          footer={<Button onClick={handleCancel}>חזרה</Button>}
        >
          <Login next={next} setUserDetails={setUserDetails}/>
        </Modal>
      </div>

    </div>
  );
}
