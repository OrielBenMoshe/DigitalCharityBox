import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import jQuery from 'jquery';
window.jQuery = jQuery;
require('dotenv').config();


export default function CreditDetailsForm() {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://app.sumit.co.il/scripts/payments.js";
        script.async = true;
        document.body.appendChild(script);
        jQuery(function () {
            window.OfficeGuy.Payments.BindFormSubmit({
                CompanyID: process.env.COMPANY_ID,
                APIPublicKey: process.env.API_PUBLIC_KEY
            });
        });

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <div className='settings CreditDetailsForm'>
            <div className='headers'>
                <h1>פרטי כרטיס אשראי</h1>
                <h3>כדי שנוכל לקבל את התרומה שלך!</h3>
            </div>
            <Form data-og="form" method="post" layout="vertical" className='content'>
                <div className="og-errors"></div>

                <Form.Item
                    label="מספר כרטיס"
                    name="cardnumber"
                    maxLength="20"
                >
                    <Input type="text" size="20" data-og="cardnumber" />
                </Form.Item>

                <Form.Item>
                    <Form.Item
                        label="תוקף כרטיס (mm/yyyy)"
                        name="expirationmonth"
                        size="2"
                        maxLength="2"
                    >
                        <Input type="text" data-og="expirationmonth" />
                    </Form.Item>
                    <span> / </span>
                    <Form.Item
                        name="expirationyear"
                        size="4"
                        maxLength="4"
                    >
                        <Input type="text" data-og="expirationyear" />
                    </Form.Item>
                </Form.Item>

                <Form.Item
                    label="CVV"
                    name="cvv"
                    size="4"
                    maxLength="4"
                >
                    <Input type="text" size="4" maxLength="4" data-og="cvv" />
                </Form.Item>
                <Form.Item
                    label="מספר ת.ז"
                    name="citizenid"
                >
                    <Input type="text" data-og="citizenid" />
                </Form.Item>
                <Form.Item>
                    <Input htmltype="submit" value="Submit" />
                </Form.Item>
            </Form>
        </div>
    )
}
