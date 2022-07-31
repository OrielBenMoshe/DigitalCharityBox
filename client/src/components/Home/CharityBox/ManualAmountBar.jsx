import React, { useRef, useState } from 'react'
import { Button, InputNumber } from 'antd'

import { state } from '../../../state';

export default function ManualAmountBar() {
    const amountRef = useRef(null);
    const [value, setValue] = useState();

    const handleClick = () => {
        let menualAmount = Number(amountRef.current.value);
        if (menualAmount) {
            console.log('amountRef:', menualAmount);
            state.user.totalAmount += menualAmount;
            setValue(0);
        }
    };

    const onChange = (input) => {
        console.log('changed', input);
        setValue(input)
    };

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
