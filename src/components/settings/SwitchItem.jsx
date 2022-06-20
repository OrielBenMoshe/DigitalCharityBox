import React, { useEffect, useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Divider, Switch, TimePicker, InputNumber } from 'antd';
import moment from 'moment';


export default function SwitchItem({ defaultChecked, label, value, type, image }) {
    const [representation, setRepresentation] = useState();
    const [disabled, setDisabled] = useState(defaultChecked ? false : true);
    const format = 'HH:mm';

  

    const handleRepresentation = () => {
        /** הפונקציה מטפלת בייצוג של המתג, 
         * אם זה המטבעות שיוצגו בעמוד הבית
         * או תזכורות למיניהן.
         */
        switch (type) {
            case "coin":
                image &&
                    setRepresentation(
                        <img src={image} alt='coin' />
                    )
                !value &&
                    setRepresentation(
                        <div className='other-sum-wrapper'> 
                            <img src={image} alt='coin' />
                            <InputNumber min={3} max={500} keyboard={true} defaultValue={3} />
                        </div>
                    )
                break;
            case "memo":
                console.log("disabled:", disabled);
                // break;
                setRepresentation(
                    <TimePicker
                        defaultValue={moment('18:00', format)}
                        format={format}
                        value={value && moment(value, format)}
                        clearText={true}
                        disabled={disabled}
                    />
                )
                break;

            default:
                break;
        }
    }

    const handleSwitch = (checked, e) => {
        console.log(checked);
        setDisabled(!checked);
    }

    useEffect(() => {
        handleRepresentation();
    }, [disabled]);
    
    // useEffect(() => {
    //     console.log("disabled:", disabled);
    // }, [disabled]);


    return (
        <>
            <div className='SwitchItem'>
                <div className="switch-wrapper">
                    <Switch
                        defaultChecked={defaultChecked}
                        onChange={handleSwitch}
                    />
                    <label>{label}</label>
                </div>
                {representation && representation}
            </div>
            <Divider/>
        </>
    )
}
