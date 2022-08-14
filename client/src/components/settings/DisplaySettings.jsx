import React, { useState, useEffect } from 'react';
import { Button } from 'antd';


// import EserAgurot from "../../assets/images/eserAgurot_tails.svg";
// import HatsiShekel from "../../assets/images/hatsiShekel_tails.svg";
import Shekel from "../../assets/images/shekel_tails.svg";
import Shnekel from "../../assets/images/shnekel_tails.svg";
import HameshShekel from "../../assets/images/hameshShekel_tails.svg";
import EserShekel from "../../assets/images/eserShekel_tails.svg";
import empty_coin from "../../assets/images/empty_coin.svg";

import SwitchItem from './SwitchItem';


export default function DisplaySettingsForm({ onClose, display }) {
    const [update, setUpdate] = useState();
    const [coinsData, setCoinsData] = useState(display.coins);

    /** Changes the state according to the user's changes  */
    useEffect(() => {
        if (update) {

            // console.log("updaated:", update);
            // console.log("coinsData:", coinsData);
            const updatedCoinsData = [...coinsData];
            const coinIndex = coinsData.findIndex(coin => coin._id === update._id);
            updatedCoinsData[coinIndex] = {
                ...coinsData[coinIndex],
                active: update.active,
                value: update.value,
            }
            setCoinsData(updatedCoinsData);
        }
    }, [update])

    const sendUpdates = () => {
        onClose(coinsData);
    }


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
                <h3>אלו מטבעות תרצה להציג באפליקציה?</h3>
            </div>
            <div className="content coins-list">
                {coinsData.map((coin, key) => {
                    return (
                        <SwitchItem
                            key={key}
                            coinId={coin._id}
                            type="coin"
                            label={valueToLabel(coin.value)}
                            value={coin.value}
                            image={valueToImage(coin.value)}
                            defaultChecked={coin.active}
                            manual={coin.manual}
                            setUpdate={setUpdate}
                        />
                    );
                })}
            </div>
            <div className="footer" style={{ textAlign: "center", marginBottom: "42px" }}>
                <Button type="primary" onClick={sendUpdates} size='large'>
                    שמור
                </Button>
            </div>

        </div>
    )
}
