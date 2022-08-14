import React, { useRef, useState, useEffect } from 'react'
import { Button, InputNumber } from 'antd'

import setLocalStorage from '../../../setLocalStorage';
import { UpdateData } from '../../../serverRequests';

export default function ManualAmountBar({ store, user }) {
    const amountRef = useRef(null);
    const [value, setValue] = useState();
    const [response, setResponse] = useState()

    const updateTotalAmount = (value) => {
        const id = user._id;
        const where = "totalAmount";
        const updatedValue = user.totalAmount + value;
        console.log("value to donate:", value);
        UpdateData(`/api/updateUser/${id}`, { where, value: updatedValue }, setResponse);
    }

    const handleClick = () => {
        let manualAmount = Number(amountRef.current.value);
        if (manualAmount) {
            updateTotalAmount(manualAmount)
            setValue(0);
        }
    };

    const onChange = (input) => {
        setValue(input);
    };

    useEffect(() => {
        if (response && store) {
            setLocalStorage("user", response.user)
                .then((user) => {
                    store.user = user;
                })
        }
    }, [response])

    return (
        <div id="ManualAmountBar">
            <InputNumber
                value={value || 0}
                ref={amountRef}
                // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                // parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={onChange}
                min={0}
                max={500}
            />
            <Button size={'large'} onClick={handleClick}>הכנס ↑</Button>
        </div>
    )
}
