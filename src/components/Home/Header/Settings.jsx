import React, { useState, useEffect } from 'react'
import { Button, Drawer } from 'antd';

import DisplaySettings from '../../settings/DisplaySettings';
import MemoSettings from '../../settings/MemoSettings';
import CreditDetailsForm from '../../settings/CreditDetailsForm';
import PersonalDetailsForm from '../../settings/PersonalDetailsForm';

export default function Settings(props) {
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState();

    const showSettings = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    useEffect(() => {
        setContent(() => {
            switch (props.title) {
                case "פרטים אישיים":
                    return <PersonalDetailsForm/>;
                case "הגדרות תצוגה":
                    return <DisplaySettings/>                  
                case "פרטי כרטיס אשראי":
                    return <CreditDetailsForm/>           
                case "הגדרות תזכורת":
                    return <MemoSettings/>
                default:
                    break;
            }
        })
    }, [])


    return (
        <div className="Settings-item">
            <Button type='text' onClick={showSettings}>{props.title}</Button>
            <Drawer
                // title={props.title}
                placement="left"
                onClose={onClose}
                visible={visible}
                width="100%"
            >
                {content}
            </Drawer>
        </div>
    )
}
