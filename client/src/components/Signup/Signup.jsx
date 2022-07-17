import React, { useState, useEffect, useRef } from 'react';
import { Button, message, Steps } from 'antd';

import { Routes, Route, Link, Outlet } from "react-router-dom";
import PersonalDetailsForm from '../settings/PersonalDetailsForm';
import CreditDetailsForm from '../settings/CreditDetailsForm';
import DisplaySettings from '../settings/DisplaySettings';
import MemoSettings from '../settings/MemoSettings';

// import useOnScreen from '../../hooks/useOnScreen';


export default function Signup() {
    const [current, setCurrent] = useState(0);
    const [personalForm, setPersonalForm] = useState();
    const refForm = useRef(null);
    // const isVisible = useOnScreen(refForm);
    
    const next = () => {
        setCurrent(current + 1);
    };
    
    const prev = () => {
        setCurrent(current - 1);
    };
    
    const submitForm = () => {
        personalForm.submit();
    }
    
    const formHandle = (ref) => {
        if (!ref.response) {
            setPersonalForm(ref)
        } else {
            ref.response === "success" && next();
        }
    }
    


    const steps = [
        {
            /** Keep this component first in the array to match the submission of the personal details form by clicking the "Next" button. */
            content: <PersonalDetailsForm ref={refForm} formHandle={formHandle} isSignup/>,
        },
        {
            content: <DisplaySettings/>,
        },
        {
            content: <MemoSettings/>,
        },
    ];
    const { Step } = Steps;
    
    // useEffect(() => {
    //     console.log("isVisible:", isVisible);
    // }, [isVisible])


    return (
        <div className='Signup' >
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
                    <Button type="primary" onClick={() => current == 0 ? submitForm() : next()} style={{ marginInline: "auto 0" }}>
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
