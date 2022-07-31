import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Button, Modal, message, Checkbox, Form, Input } from 'antd';
import Login from "../Login/Login";

export default function FirstEntry() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const refLoginForm = useRef(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // refLoginForm.current.submit();
        // setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // const onFinish = (values) => {
    //     console.log('Success:', values);
    // };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <div id='FirstEntry' className='container'>
            <h1 className='entry-title'>קופת הצדקה הדיגיטלית שלך</h1>

            <Button type="link" className='modal-link' onClick={showModal} block> כבר נרשמתם אצלינו?  התחברו כאן </Button>
            <Modal title="כניסת רשומים" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {/* <Form
                    ref={refLoginForm}
                    name="basic"
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item label="שם משתמש" name="username"
                        rules={[
                            {
                                required: true,
                                message: 'בבקשה הכנס את שם המשתמש שלך!',
                            },
                        ]}
                    >
                        <Input />
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
                <ConnectWithGoogle /> */}
                <Login />
            </Modal>
            <Link to="/Signup" className='signup-link'>
                <Button>בואו נתחיל!</Button>
            </Link>
        </div>
    )
}
