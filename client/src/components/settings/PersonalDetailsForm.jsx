import React, { useRef, useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import { PostToServer } from "../../getData";

import { state } from '../../state';
import { useSnapshot } from 'valtio';

import { Storage } from '@capacitor/storage';

export default function PersonalDetailsForm(props) {
    const [initialValues, setInitialValues] = useState({ ...state.user });
    const personalForm = useRef();
    const firstInput = useRef();
    const snap = useSnapshot(state);
    // console.log("personalInfo:", snap.user);
    // console.log(initialValues);
    // console.log('Success:', state.user);

    const savePersonalInfo = (values) => {
        // await Storage.set({ key: "personalInfo", value: JSON.stringify(values) })
        // state.user.personalInfo = { ...state.user.personalInfo, ...values };
    }


    const onFinish = (values) => {
        console.log('Success:', values);
        PostToServer(
            "/api/addUser",
             {...values, UIDfirebase: state.UIDfirebase}
          );
        savePersonalInfo(values);
        // props.setVisible(false);
        props.formHandle({ response: "success" })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        props.formHandle({ response: "failed" })
    };

    useEffect(() => {
        firstInput.current.focus();
        props.formHandle(personalForm.current);
    }, [])

    // useEffect(() => {
    //     setInitialValues({ ...state.user.personalInfo });
    // }, [state])



    return (
        <div className='settings PersonalDetailsForm'>
            <div className='headers'>
                <h1>פרטים אישיים</h1>
                <h3>כדי לרשום את החשבונית על שמך ולשלוח לך בדואר</h3>
            </div>
            <Form
                className='content'
                name="basic"
                layout="vertical"
                initialValues={{
                    remember: true,
                    ...initialValues
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                ref={personalForm}
                scrollToFirstError
            >
                <Form.Item
                    label="שם פרטי"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'לא אמרת מה השם שלך',
                        },
                    ]}
                    initialValue={""}
                >
                    <Input ref={firstInput} />
                </Form.Item>
                <Form.Item
                    label="שם משפחה"
                    name="lastName"
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
                    name="phoneNumber"
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
