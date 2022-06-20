import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd';


import SwitchItem from './SwitchItem';


export default function MemoSettings() {
    return (
        <div className="settings DisplaySettingsForm">
            <div className='headers'>
                <h1>ניהול תזכורות</h1>
                <h3>מתי להזכיר לך שאפשר לתת צדקה ממש מכאן?</h3>
            </div>
            <div className="coins-list">
                <SwitchItem 
                    key={1}
                    type="memo"
                    label="בשחרית"
                    value={"8:10"}
                    defaultChecked={true}
                />
                <SwitchItem 
                    key={2}
                    type="memo"
                    label="במנחה"
                    value={"14:00"}
                    defaultChecked={false}
                />
                <SwitchItem
                    key={3} 
                    type="memo"
                    label="בזמן אחר"
                    defaultChecked={false}
                />
            </div>
        </div>
    )
}
