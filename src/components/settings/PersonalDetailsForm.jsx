import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom";


export default function PersonalDetailsForm() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='settings PersonalDetailsForm'>
            <div className='headers'>
                <h1>פרטים אישיים</h1>
                <h3>כדי לרשום את החשבונית על שמך ולשלוח לך בדואר</h3>
            </div>
            <Form
                name="basic"
                layout="vertical"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                scrollToFirstError
            >
                <Form.Item
                    label="שם פרטי"
                    name="first-name"
                    rules={[
                        {
                            required: true,
                            message: 'לא אמרת מה השם שלך',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="שם משפחה"
                    name="last-name"
                    rules={[
                        {
                            required: true,
                            message: 'לא אמרת מאיזו משפחה אתה',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="מספר טלפון"
                    name="phone-number"
                    rules={[
                        {
                            required: true,
                            message: 'מה מספר הטלפון שלך?',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="דואר אלקטרוני"
                    name="email"
                >
                    <Input />
                </Form.Item>
                <Form.Item               
                >
                    <Form.Item
                        label="כתובת"
                        name="address"
                        style={{
                            display: 'inline-block',
                            width: 'calc(56%)',
                        }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="ישוב"
                        name="city"
                        style={{
                            display: 'inline-block',
                            width: 'calc(44% - 13px)',
                            marginInlineStart: "13px"
                        }}
                    >
                        <Input />
                    </Form.Item>
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
