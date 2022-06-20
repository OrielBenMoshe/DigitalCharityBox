import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';

import { Routes, Route, Link, Outlet } from "react-router-dom";
import PersonalDetailsForm from '../settings/PersonalDetailsForm';
import CreditDetailsForm from '../settings/CreditDetailsForm';
import DisplaySettings from '../settings/DisplaySettings';
import MemoSettings from '../settings/MemoSettings';

const { Step } = Steps;
const steps = [
    {
        content: <PersonalDetailsForm />,
    },
    {
        content: <DisplaySettings />,
    },
    {
        content: <MemoSettings />,
    },
];

export default function Signup() {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };


    return (
        <div className='Signup'>
            <Steps current={current} size="small">
                {steps.map((item, key) => (
                    <Step key={key} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        חזרה
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()} style={ { marginInline: "auto 0"} }>
                        הבא
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('ההגדרות הראשוניות הושלמו בהצלחה, הקופה כבר מוכנה.')}>
                        זהו, סיימנו!
                    </Button>
                )}
            </div>
            {/* <Outlet/> */}
        </div>
    )
}
