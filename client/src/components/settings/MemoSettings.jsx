import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

import SwitchItem from './SwitchItem';
import useAxios from '../../hooks/useAxios';

import { state } from '../../state';
import { useSnapshot, subscribe } from 'valtio';

import { useSearchParams } from "react-router-dom";

export default function MemoSettings({ onClose }) {
    let [searchParams, setSearchParams] = useSearchParams();
    let params = searchParams.get('token') && { 
        CreditCard_CitizenID: searchParams.get('citizenid'),
        CreditCard_Token: searchParams.get('token'),
    }
    const { data, loading, error } = useAxios('post', 'sumit/setCustomer', params);
    const snap = useSnapshot(state);
    const reminders = snap.user.reminders

    useEffect(() => {
        console.log("data:", data);
    
    }, [data])
    
    return (
        <div className="settings DisplaySettingsForm">
            <div className='headers'>
                <h1>ניהול תזכורות</h1>
                <h3>מתי להזכיר לך שאפשר לתת צדקה ממש מכאן?</h3>
            </div>
            <div className="content memo-list">.
                {reminders.map((reminder, key) =>
                    <SwitchItem
                        key={key}
                        type="memo"
                        label={reminder.label}
                        value={reminder.time}
                        defaultChecked={reminder.active}
                    />
                )}
            </div>
            {onClose &&
                <div className="footer" style={{ textAlign: "center", marginTop: "42px" }}>
                    <Button type="primary" onClick={onClose} size='large'>
                        סגור
                    </Button>
                </div>
            }
        </div>
    )
}
