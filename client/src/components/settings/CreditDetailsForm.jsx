import React, { useEffect, useState, useRef, createRef } from 'react';

import Iframe from 'react-iframe';
import { Alert, Button, Form, Input } from 'antd';

export default function CreditDetailsForm(props) {
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [citizeId, setCitizeId] = useState();
    const formRef = createRef();
    const firstInputRef = useRef();
    const errorRef = useRef();

    const onFinish = (values) => {
        // console.log('Success:', values);
        // props.formResponse("success");
        // props.setUserDetails({...props.userDetails, ...values})
    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
        // props.formResponse("failed");
    };

    useEffect(() => {
        window && window.OfficeGuy.Payments.BindFormSubmit({
            CompanyID: process.env.REACT_APP_COMPANY_ID,
            APIPublicKey: process.env.REACT_APP_API_PUBLIC_KEY
        })
        firstInputRef.current.focus();
        props.formRefForward(formRef.current);
    }, []);

    return (
        <div className='settings CreditDetailsForm'>
            <div className='headers'>
                <h1>פרטי כרטיס אשראי</h1>
                <h3>כדי שנוכל לקבל את התרומה שלך!</h3>
            </div>
            {/* <Iframe allow="fullscreen" url={gateway} height="100%" width="100%" id='gateway' loading={'∆∆∆'} overflow/> */}
            <Form
                name='CreditCardForm'
                className='content'
                layout="vertical"
                ref={formRef}
                data-og="form"
                autoComplete="on"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
                onSubmit={e => e.preventDefault()}
            >
                <div ref={errorRef} className="og-errors"></div>

                <Form.Item label="מספר כרטיס" required>
                    <Input 
                        ref={firstInputRef} 
                        type="text" 
                        size="20" 
                        maxLength="20" 
                        data-og="cardnumber" 
                        name='cardNumber' 
                        value={"4557-4304-0205-3340"} 
                    />
                </Form.Item>

                <Input.Group compact>
                    <Form.Item
                        label="תוקף הכרטיס (mm/yyyy)"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'חסר התוקף',
                            },
                        ]}
                    >
                        <Input
                            value={2025}
                            type="number"
                            size="4"
                            style={{ width: '60%' }}
                            maxLength="4"
                            min={new Date().getFullYear()}
                            max={new Date().getFullYear() + 20}
                            name="expirationYear"
                            data-og="expirationyear"
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <Input
                            value={2}
                            type="number"
                            size="12"
                            style={{ width: '40%' }}
                            min={1}
                            max={12}
                            maxLength="2"
                            name="expirationMonth"
                            data-og="expirationmonth"
                            onChange={(e) => setMonth(e.target.value)}
                        />
                    </Form.Item>
                </Input.Group>

                <Form.Item label="CVV" style={{ width: '48%' }} rules={[
                            {
                                required: true,
                                message: 'חסר לי 3 ספרות שבגב הכרטיס',
                            },
                        ]}>
                    <Input 
                        type="text" 
                        size="4" 
                        style={{ width: '50%' }} 
                        maxLength="4" 
                        name="CVV" 
                        data-og="cvv" value={883} />
                </Form.Item>

                <Form.Item label="מספר תעודת זהות" rules={[
                            {
                                required: true,
                                message: 'שכחת את מס׳ תעודת הזהות שלך?',
                            },
                        ]}>
                    <Input 
                        type="text" 
                        name="citizenId" 
                        data-og="citizenid" 
                        onChange={(e) => 
                        setCitizeId(e.target.value)} 
                        value={123456789} 
                    />
                </Form.Item>

                <Input type="submit" value="אישור" />
            </Form>
        </div>
    )
}
