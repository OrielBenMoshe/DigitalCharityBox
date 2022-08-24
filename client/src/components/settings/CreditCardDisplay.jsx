import React from 'react'
import { Button } from "antd";

export default function CreditCardDisplay({costumerInfo, setCostumerInfo}) {
    const expired = `${costumerInfo.expirationMonth}/${costumerInfo.expirationYear}`;
    return (
        <div className="settings DisplaySettingsForm">
            <div className='headers'>
                <h1>אמצעי תשלום</h1>
                <h3>כרטיס אשראי:</h3>
            </div>
            <div className="content">
                <div className="creditCard">
                    <div className="date">{expired}</div>
                    <div className="lastDigits"><span>●●●●</span>{costumerInfo.lastDigits}</div>
                    <img src="" alt="" />
                </div>
            </div>
            <div className="footer" style={{ textAlign: "center", marginBottom: "42px" }}>
                <Button type="primary"  size='large'>
                    החלפת אמצעי תשלום
                </Button>
            </div>
        </div>
    )
}
