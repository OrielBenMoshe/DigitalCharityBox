import React, { useState, useEffect, useRef } from 'react';
import { Button, message, Steps } from 'antd';

import { Routes, Route, Link, Outlet } from "react-router-dom";

/** Components */
import Register from './Register';
import PersonalDetailsForm from '../settings/PersonalDetailsForm';
import CreditDetailsForm from '../settings/CreditDetailsForm';
import DisplaySettings from '../settings/DisplaySettings';
import MemoSettings from '../settings/MemoSettings';

import { useSearchParams } from "react-router-dom";
import SignupWithFirebase from '../settings/SignupWithFirebase';

// import useOnScreen from '../../hooks/useOnScreen';


export default function FirstRegistrationSteps() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [current, setCurrent] = useState(0);
    const [formRef, setFormRef] = useState();
    // const isVisible = useOnScreen(refForm);
    
    const next = () => {
        setCurrent(current + 1);
    };
    
    const prev = () => {
        setCurrent(current - 1);
    };
    
    const submitForm = () => {
        formRef.submit();
    }
    
    const formRefForward = (ref) => {
        setFormRef(ref)
        // if (!ref.response) {
        // } else {
        //     ref.response === "success" && next();
        // }
    }

    const handleNextBtn = () => {
        if (formRef) {
            formRef.submit();
        } 
        next();
    }
    
    /**  צריך לטפל בשני טפסים עם רפרנסים, בעת לחיצה על הבא הטופס נשלח */

    const steps = [
        {
            content: <Register />,
        },
        // {
        //     content: <SignupWithFirebase formRefForward={formRefForward}/>,
        // },
        {
            content: <PersonalDetailsForm formRefForward={formRefForward} isSignup/>,
        },
        {
            content: <CreditDetailsForm/>,
        },
        // {
        //     content: <MemoSettings/>,
        // },
        // {
        //     content: <DisplaySettings/>,
        // },
    ];
    const { Step } = Steps;
    
    // useEffect(() => {
    //     console.log("isVisible:", isVisible);
    // }, [isVisible])

    useEffect(() => {
        searchParams.get("token") && setCurrent(2);
    }, []);


    return (
        <div className='FirstRegistrationSteps' >
            <Steps current={current} size="small" direction="horizontal" responsive={false}>
                {steps.map((item, key) => {
                    
                    return (<Step key={key} title={item.title} />)
                })}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current === 0 && (
                    <Link to="/Home">→ חזרה</Link>
                )}
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        → חזרה
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={handleNextBtn} style={{ marginInline: "auto 0" }}>
                        הבא ←
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Link to="/Home">
                        <Button type="primary" onClick={() => message.success('ההגדרות הראשוניות הושלמו בהצלחה, הקופה כבר מוכנה.') }>
                            זהו, סיימנו!
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    )
}
