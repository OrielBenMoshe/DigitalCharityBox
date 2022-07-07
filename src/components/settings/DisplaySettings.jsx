import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd';

// import EserAgurot from "../../assets/images/eserAgurot_tails.svg";
// import HatsiShekel from "../../assets/images/hatsiShekel_tails.svg";
import Shekel from "../../assets/images/shekel_tails.svg";
import Shnekel from "../../assets/images/shnekel_tails.svg";
import HameshShekel from "../../assets/images/hameshShekel_tails.svg";
import EserShekel from "../../assets/images/eserShekel_tails.svg";


import SwitchItem from './SwitchItem';


export default function DisplaySettingsForm() {
    return (
        <div className="settings DisplaySettingsForm">
            <div className='headers'>
                <h1>הגדרות לתצוגה</h1>
                <h3>אלו מטבעות להציג באפליקציה בלי לבזבז זמן מיותר?</h3>
            </div>
            <div className="coins-list">
                <SwitchItem 
                    key={2}
                    type="coin"
                    label="שקל אחד"
                    value={1}
                    image={Shekel}
                    defaultChecked={true}
                />
                <SwitchItem
                    key={3} 
                    type="coin"
                    label="שני שקל"
                    value={2}
                    image={Shnekel}
                    defaultChecked={true}
                />
                <SwitchItem 
                    key={4} 
                    type="coin"
                    label="חמש שקל"
                    value={5}
                    image={HameshShekel}
                    defaultChecked={false}
                />
                <SwitchItem 
                    key={5}
                    type="coin"
                    label="עשר שקל"
                    value={10}
                    image={EserShekel}
                    defaultChecked={true}
                />
                <SwitchItem 
                    key={6}
                    type="coin"
                    label="סכום אחר:"
                    image={EserShekel}
                    defaultChecked={true}
                />
                
            </div>
        </div>
    )
}
