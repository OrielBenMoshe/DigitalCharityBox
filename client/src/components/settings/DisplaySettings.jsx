import React from 'react';
import { Button } from 'antd';

/** Global State */
import { state } from '../../state';
import { useSnapshot, subscribe } from 'valtio';


// import EserAgurot from "../../assets/images/eserAgurot_tails.svg";
// import HatsiShekel from "../../assets/images/hatsiShekel_tails.svg";
import Shekel from "../../assets/images/shekel_tails.svg";
import Shnekel from "../../assets/images/shnekel_tails.svg";
import HameshShekel from "../../assets/images/hameshShekel_tails.svg";
import EserShekel from "../../assets/images/eserShekel_tails.svg";
import empty_coin from "../../assets/images/empty_coin.svg";

import SwitchItem from './SwitchItem';


export default function DisplaySettingsForm({onClose}) {
    const snap = useSnapshot(state);
    const coinsData = snap.user.display.coins;

    const valueToLabel = (value) => {
        switch (value) {
            case 1:
                return "שקל אחד"
            case 2:
                return "שני שקל"
            case 5:
                return "חמש שקל"
            case 10:
                return "עשר שקל"
            default:
                return "סכום אחר:";
        }
    }

    const valueToImage = (value) => {
        switch (value) {
            case 1:
                return Shekel;
            case 2:
                return Shnekel;
            case 5:
                return HameshShekel;
            case 10:
                return EserShekel;
            default:
                return empty_coin;
        }
    }
    return (
        <div className="settings DisplaySettingsForm">
            <div className='headers'>
                <h1>הגדרות לתצוגה</h1>
                <h3>אלו מטבעות להציג באפליקציה בלי לבזבז זמן מיותר?</h3>
            </div>
            <div className="content coins-list">
                {coinsData.map((coin, key) => {
                    return (
                        <SwitchItem
                            key={key}
                            type="coin"
                            label={valueToLabel(coin.value)}
                            value={coin.value}
                            image={valueToImage(coin.value)}
                            defaultChecked={coin.active}
                            manual={coin.manual}
                        />
                    );
                })}
            </div>
            { onClose && 
                <div className="footer" style={{ textAlign: "center", marginTop: "42px" }}>
                    <Button type="primary" onClick={onClose} size='large'>
                        סגור
                    </Button>
                </div> 
            }
        </div>
    )
}
