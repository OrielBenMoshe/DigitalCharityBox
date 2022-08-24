import React, { useRef, useEffect, useState, createRef } from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom";

export default function PersonalDetailsForm(props) {
    const formRef = createRef();
    const firstInputRef = useRef();


    const onFinish = (values) => {
        // console.log('Success:', values);
        // props.setVisible(false);
        props.formResponse("success");
        props.setUserDetails({...props.userDetails, ...values})
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        props.formResponse("failed");
    };
    useEffect(() => {
        firstInputRef.current.focus();
        props.formRefForward(formRef.current);
        console.log('props.userDetails:', props.userDetails);

    }, [])

    return (
        <div className='settings PersonalDetailsForm'>
            <div className='headers'>
                <h1>פרטים אישיים</h1>
                <h3>כדי לרשום את החשבונית על שמך ולשלוח לך בדואר</h3>
            </div>
            <Form
                disabled={props.isSignup ? false : true}
                className='content'
                name="PersonalForm"
                ref={formRef}
                layout="vertical"
                initialValues={{
                    remember: true,
                    displayName: (props.userDetails && props.userDetails.displayName) ? props.userDetails.displayName : (props.userDetails && props.userDetails.fullName),
                    phoneNumber: (props.userDetails && props.userDetails.phoneNumber) && props.userDetails.phoneNumber,
                    city: props.userDetails && props.userDetails.city && props.userDetails.city,
                    address: props.userDetails && props.userDetails.address && props.userDetails.address,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                scrollToFirstError
            >
                <Form.Item
                    // initialValue={"בדיקה בודק"}
                    label="שם מלא"
                    name="displayName"
                    rules={[
                        {
                            required: true,
                            message: 'לא אמרת מה השם שלך',
                        },
                    ]}
                >
                    <Input ref={firstInputRef} />
                </Form.Item>
                {/* <Form.Item
                    label="שם משפחה"
                    name="lastName"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'לא אמרת מאיזו משפחה אתה',
                    //     },
                    // ]}
                >
                    <Input />
                </Form.Item> */}
                <Form.Item
                    label="מספר טלפון"
                    name="phoneNumber"
                    // initialValue="05005005005"
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
                >
                    <Form.Item
                        label="כתובת"
                        name="address"
                        // initialValue="הבדיקה 70"
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
                        // initialValue="קרית בדיקות"
                        style={{
                            display: 'inline-block',
                            width: 'calc(44% - 13px)',
                            marginInlineStart: "13px"
                        }}
                    >
                        <Input />
                    </Form.Item>
                </Form.Item>

                {
                    !props.isSignup &&
                    <Form.Item style={{textAlign: "center"}}>
                        <Button type="primary" htmlType="submit" size='large'>
                            שמור
                        </Button>
                    </Form.Item>
                }
            </Form>
        </div>
    )
}
