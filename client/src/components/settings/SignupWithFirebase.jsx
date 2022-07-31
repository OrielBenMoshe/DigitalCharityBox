import React, { useEffect, useState, useRef, createRef } from 'react'
import ConnectWithGoogle from '../Signup/connectWithGoogle'
import { Button, Modal, message, Checkbox, Form, Input } from 'antd';


export default function SignupWithFirebase({ formRefForward }) {
    const formRef = createRef();
    const firstInputRef = useRef();

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        firstInputRef.current.focus();
        formRefForward(formRef.current);
    }, [])

    return (
        <div className='settings SignupWithFirebase'>
            <div className='headers'>
                <h1>הרשמה</h1>
                <h3>בואו נכניס אתכם לרשימת התורמים שלנו</h3>
            </div>
            <div className="content">
                <Form
                    name="firebase"
                    ref={formRef}
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item label="דואל אלקטרוני" name="email"
                        rules={[
                            {
                                required: true,
                                message: 'בבקשה הכנס את שם המשתמש שלך!',
                            },
                        ]}
                    >
                        <Input ref={firstInputRef}/>
                    </Form.Item>

                    <Form.Item label="סיסמה" name="password"
                        rules={[
                            {
                                required: true,
                                message: 'בבקשה הכנס את הסיסמה שלך!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>זכור אותי</Checkbox>
                    </Form.Item>
                </Form>
                <ConnectWithGoogle />
            </div>
        </div>
    )
}
