import React, { useEffect, useState } from 'react';
import { Divider, Switch, TimePicker, InputNumber } from 'antd';
import moment from 'moment';

/** Global State */
import { state } from '../../state';
import { useSnapshot, subscribe } from 'valtio';

export default function SwitchItem({ defaultChecked, label, value, type, image, manual, setUpdate, coinId }) {
    const [representation, setRepresentation] = useState();
    const [manualValue, setManualValue] = useState(value);
    const [disabled, setDisabled] = useState(!defaultChecked);
    const format = 'HH:mm';
    const snap = useSnapshot(state);
    const reminders = snap.user.reminders;


    const handleValueChange = (val) => {
        let manualValueIndex;
        switch (type) {
            case "coin":
                // console.log("coin:", val);
                updateActivityStatus(val, true)
                setManualValue(val);
                // manualValueIndex = coins.findIndex(coin => coin.manual);
                // state.user.display.coins[manualValueIndex].value = val;

                break;
            case "memo":
                const time = moment(val).format(format);
                setManualValue(time);
                manualValueIndex = reminders.findIndex(reminder => reminder.label === label);
                state.user.reminders[manualValueIndex].time = time;
                break;
            default:
                break;
        }
    }

    const handleSwitch = (isChecked, e) => {
        setDisabled(!isChecked);
        updateActivityStatus(value, isChecked);
    }

    /** Update switch changes in the global state. */
    const updateActivityStatus = async (val, isChecked) => {
        switch (type) {
            case "coin":
                /** Pass the update to Parent.  */
                setUpdate({
                    _id: coinId,
                    active: isChecked,
                    value: val
                })
                break;
            case "memo":
                for (let i in reminders) {
                    if (reminders[i].time === val) {
                        state.user.reminders[i].active = isChecked;
                        break;
                    }
                }
                break;
            default:
                break;
        }
    }



    useEffect(() => {
        handleRepresentation();
    }, [disabled, manualValue]);


    const handleRepresentation = () => {
        switch (type) {
            case "coin":
                setRepresentation(!manual
                    ? (<img src={image} alt='coin' />)
                    : (
                        <div className='manual-value-wrapper'>
                            <img src={image} alt='coin' /*style={{ visibility: "hidden" }}*/ />
                            <InputNumber
                                min={3}
                                max={99}
                                keyboard={true}
                                value={manualValue}
                                onChange={handleValueChange}
                                disabled={disabled}
                            />
                        </div>)
                );
                break;
            case "memo":
                setRepresentation(
                    <TimePicker
                        format={format}
                        value={moment(manualValue, format)}
                        onChange={handleValueChange}
                        clearText={true}
                        disabled={disabled}
                    />
                )
                break;

            default:
                break;
        }
    }

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
