import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

import SwitchItem from './SwitchItem';

export default function MemoSettings({ onClose, reminders, setReminders }) {
  

    return (
        <div className="settings DisplaySettingsForm">
            <div className='headers'>
                <h1>ניהול תזכורות</h1>
                <h3>מתי להזכיר לך שאפשר לתת צדקה ממש מכאן?</h3>
            </div>
            <div className="content memo-list">
                {reminders === "44"
                    ? reminders.map((reminder, key) =>
                    <SwitchItem
                        key={key}
                        type="memo"
                        label={reminder.label}
                        value={reminder.time}
                        defaultChecked={reminder.active}
                    />
                )
                : <h3> אין אפשרות לתזכורות בשלב זה..</h3>
                }
            </div>
            {onClose &&
                <div className="footer" style={{ textAlign: "center", marginBottom: "42px" }}>
                    <Button type="primary" onClick={onClose} size='large'>
                        שמור
                    </Button>
                </div>
            }
        </div>
    )
}
