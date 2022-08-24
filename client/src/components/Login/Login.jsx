import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Spin, Modal, Form, Button, Divider, message } from "antd";

/** Firebase Authetication */
import { auth, logInWithEmailAndPassword, signInWithGoogle, sendPasswordReset } from '../../firebase';
// import { useAuthState } from "react-firebase-hooks/auth";


import { GetData } from "../../serverRequests";
import setLocalStorage from "../../setLocalStorage";

/** Valtio */
import { state } from "../../state";


export default function Login({ setUserDetails, next }) {
    // const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [userFromDB, setUserFromDB] = useState();
    const [email, setEmail] = useState();
    const [firebaseUser, setFirebaseUser] = useState();
    const emailLoginRef = useRef(null);

    // useEffect(() => {
    //     if (loading) {
    //         // maybe trigger a loading screen
    //         return;
    //     }
    //     console.log("user:", user);

    // }, [user, loading]);

    useEffect(() => {
        emailLoginRef.current.focus();
    }, [])

    useEffect(() => {
        if (userFromDB && userFromDB.user) {
            setLocalStorage("user", userFromDB.user)
                .then((user) => {
                    state.user = user;
                    message.success('ההתחברות הצליחה!')
                    setTimeout(() => {
                        navigate('/Home');
                    }, 1000);
                })
        } else {
            if (userFromDB && userFromDB.message) {
                console.log(userFromDB.message);
                message.success('ההתחברות הצליחה אבל אנחנו רואים שחסרים לנו פרטים עליך, בו תמשיך ברישום')
                setUserDetails({
                    firebaseUID: firebaseUser.uid,
                    displayName: firebaseUser.displayName,
                    email: firebaseUser.email
                })
                next();
            }
        }
    }, [userFromDB])


    const onFinish = async ({ email, password }) => {
        // console.log('Success:', {email, password});
        try {
            const res = await logInWithEmailAndPassword(email, password);
            if (res.user) {
                setFirebaseUser(res.user)
                GetData(`/api/findUser/${res.user.uid}`, setUserFromDB);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="FirebaseLoginForm"
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
                        message: 'כדי להתחבר צריך להזין את המייל שלך..',
                    },
                ]}
            >
                <Input placeholder="דואר אלקטרוני" ref={emailLoginRef} onInput={(e) => setEmail(e.target.value)} />
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
                <Button htmlType="submit" size="large">התחבר</Button>
            </Form.Item>
            {/* <Button type="primary" size="large" onClick={signInWithGoogle}>
                אני רוצה להתחבר עם Google
            </Button> */}
            <Divider>שכחת סיסמה?</Divider>
            <Button onClick={() => sendPasswordReset(email)}>לאיפוס סיסמה תלחצו עלי</Button>
        </Form>
    );
};
