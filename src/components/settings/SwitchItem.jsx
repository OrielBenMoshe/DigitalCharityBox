import React, { useEffect, useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Divider, Switch, TimePicker, InputNumber } from 'antd';
import moment from 'moment';

import { state } from '../../state';
import { useSnapshot } from 'valtio';

import { Storage } from '@capacitor/storage';

export default function SwitchItem({ defaultChecked, label, value, type, image }) {
    const [representation, setRepresentation] = useState();
    const [disabled, setDisabled] = useState(defaultChecked ? false : true);
    const format = 'HH:mm';
    const snap = useSnapshot(state);

    const handleRepresentation = () => {
        switch (type) {
            case "coin":
                image &&
                    setRepresentation(
                        <img src={image} alt='coin' />
                    );
                !value &&
                    setRepresentation(
                        <div className='other-sum-wrapper'>
                            <img src={image} alt='coin' />
                            <InputNumber min={3} max={500} keyboard={true} defaultValue={3} />
                        </div>
                    );
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

    const saveSetting = async (type, val, checked) => {
        console.log("dsfg");
        switch (type) {
            case "coin":
                const { value } = await Storage.get({ key: 'display' });
                if (value) {
                    const display = JSON.parse(value);
                    const coinsArr = display.coins;
                    const objIndex = coinsArr.findIndex((obj => obj['value'] === val));
                    objIndex 
                        ? coinsArr[objIndex].active = checked
                        : coinsArr = [...coinsArr, {value: val, active: checked}]
                    display = {...display, coins: coinsArr};
                    await Storage.set({ key: "display", value: JSON.stringify(display) })
                } else {
                    const display = { coins: [ { value: val, active: checked } ] };
                    await Storage.set({ key: "display", value: JSON.stringify(display) })
                }

                break;

            case "memo":

                break;

            default:
                break;
        }
    }

    const handleSwitch = (checked, e) => {
        console.log(checked);
        setDisabled(!checked);
        saveSetting(type, value, checked)
    }

    useEffect(() => {
        handleRepresentation();
    }, [disabled]);

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
            <Divider />
        </>
    )
}
