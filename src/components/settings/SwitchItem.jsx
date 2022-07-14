import React, { useEffect, useState } from 'react';
import { Divider, Switch, TimePicker, InputNumber } from 'antd';
import moment from 'moment';

/** Global State */
import { state } from '../../state';
import { useSnapshot, subscribe } from 'valtio';

/** Capacitor LocalStorage library */
import { Storage } from '@capacitor/storage';

export default function SwitchItem({ defaultChecked, label, value, type, image, manual }) {
    const [representation, setRepresentation] = useState();
    const [manualValue, setManualValue] = useState(value);
    const [disabled, setDisabled] = useState(!defaultChecked);
    const format = 'HH:mm';
    const snap = useSnapshot(state);
    const coins = snap.user.display.coins;

    const handleRepresentation = () => {
        switch (type) {
            case "coin":
                setRepresentation( !manual
                    ? ( <img src={image} alt='coin' /> )
                    : (
                        <div className='manual-value-wrapper'>
                            <img src={image} alt='coin' style={{visibility: "hidden"}}/>
                            <InputNumber 
                                min={3} 
                                max={500} 
                                keyboard={true} 
                                value={manualValue} 
                                onChange={handleValueChange}
                                disabled={disabled}
                            />
                        </div>)
                    );
                break;
            case "memo":
                console.log("disabled:", disabled);
                // break;
                setRepresentation(
                    <TimePicker
                        defaultValue={moment('18:00', format)}
                        format={format}
                        value={moment(manualValue, format)}
                        clearText={true}
                        disabled={disabled}
                    />
                )
                break;

            default:
                break;
        }
    }
    const handleValueChange = (val) => {
        console.log(val);
        setManualValue(val);
        const manualValueIndex = coins.findIndex(coin => coin.manual);
        state.user.display.coins[manualValueIndex].value = val;
        updateDisplaySettings(val, true)
    }

    // Update changes in the global state.
    const updateDisplaySettings = async (val, isChecked) => {
        switch (type) {
            case "coin":
                /** Turns the coin representation on or off as the user changes.  */
                for (let i in coins) {
                    if ( coins[i].value === val ) {
                        state.user.display.coins[i].active = isChecked; 
                        break;
                    }
                }
                break;

            case "memo":

                break;

            default:
                break;
        }
    }

    const handleSwitch = (isChecked, e) => {
        setDisabled(!isChecked);
        updateDisplaySettings(value, isChecked);
    }

    useEffect(() => {
        handleRepresentation();
    }, [disabled, manualValue]);
        
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
