import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

import { Input } from 'antd';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();


    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        console.log("user:", user);
        if (user) navigate("/Home");
    }, [user, loading]);

    return (
        <div className="login">
            <div className="login__container">
                <Input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="כתובת אי-מייל"
                />
                <Input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="סיסמה"
                />
                <button
                    className="login__btn"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    התחבר
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    התחבר עם Google
                </button>
                <div>
                    <Link to="/reset">שכחת סיסמה?</Link>
                </div>
                <div>
                    אין לך עדיין חשבון? <Link to="/register">הירשם</Link> כעת.
                </div>
            </div>
        </div>
    );
};
