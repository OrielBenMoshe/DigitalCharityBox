import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd';

import SwitchItem from './SwitchItem';

import { state } from '../../state';
import { useSnapshot, subscribe  } from 'valtio';


export default function MemoSettings() {
    const snap = useSnapshot(state);
    const reminders = snap.user.reminders

    return (
        <div className="settings DisplaySettingsForm">
            <div className='headers'>
                <h1>ניהול תזכורות</h1>
                <h3>מתי להזכיר לך שאפשר לתת צדקה ממש מכאן?</h3>
            </div>
            <div className="coins-list">.
                { reminders.map((reminder, key) => 
                    <SwitchItem 
                        key={key}
                        type="memo"
                        label={reminder.label}
                        value={reminder.time}
                        defaultChecked={reminder.active}
                    />
                )}
            </div>
        </div>
    )
}
