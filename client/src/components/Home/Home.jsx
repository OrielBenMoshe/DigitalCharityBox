import React, { useEffect, useState, useRef } from 'react';

/** Dragg & Dropp */
import { DndContext } from '@dnd-kit/core';
import { Draggable } from '../Draggable';
import { Droppable } from '../Droppable';

/** Global State */
import { state } from '../../state';
import { useSnapshot, subscribe } from 'valtio';

import FirstEntry from './FirstEntry';
import Header from './Header/Header';
import ManualAmountBar from './ManualAmountBar';

/** Images of coins */
import Shekel from "../../assets/images/shekel_heads.svg";
import Shnekel from "../../assets/images/shnekel_heads.svg";
import HameshShekel from "../../assets/images/hameshShekel_heads.svg";
import EserShekel from "../../assets/images/eserShekel_heads.svg";
import EmptyCoin from "../../assets/images/empty_coin.svg";
import CharityBox from "../../assets/images/charity_box.png"

export default function Home() {
    const snap = useSnapshot(state);
    const user = snap.user;
    const userName = user.personalInfo.firstName;
    const [isConnected, setIsConnected] = useState(true); // Check if user logged-in.
    const [displayCoins, setDisplayCoins] = useState([]);
    const [parent, setParent] = useState(null);
    const [child, setChild] = useState(null);


    const createCoinElements = (coins) => {
        return coins.map((coin, key) => {
            let coinSrc;
            let idName;
            switch (coin.value) {
                case 1:
                    coinSrc = Shekel;
                    idName = 'Shekel';
                    break;
                case 2:
                    coinSrc = Shnekel;
                    idName = 'Shnekel';
                    break;
                case 5:
                    coinSrc = HameshShekel;
                    idName = 'HameshShekel';
                    break;
                case 10:
                    coinSrc = EserShekel;
                    idName = 'EserShekel';
                    break;
                default:
                    coinSrc = EmptyCoin;
                    idName = 'EmptyCoin';
                    break;
            }

            return coin.active && (
                <Draggable key={key} id={idName} className="coin" value={coin.value}>
                    <img src={coinSrc} alt={coin.value} />
                    {idName === 'EmptyCoin' && <h2>{coin.value}</h2>}
                </Draggable>
            )
        })
    }
    const handleDragEnd = (event) => {
        const { over } = event;

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
        setChild(over ? { id: event.active.id } : null);
        setTimeout(() => { // Remove the coin from charity-box after dropped over/.
            setParent(null)
            setChild(null)
        }, 800);
    }

    useEffect(() => {
        setDisplayCoins(createCoinElements(user.display.coins));
    }, [user.display.coins]);


    return (
        <div className='Home'>
            {
                isConnected ?
                    (<div id='front-app'>
                        <Header />
                        <DndContext onDragEnd={handleDragEnd}>
                            <h2>{`שלום ${userName}! טוב לראותך`}</h2>
                            <Droppable id="charityBox" className="charity-box">
                                <div className="coins-wrapper">
                                    {parent === "charityBox"
                                        && displayCoins.find(coin => coin.props.id === child.id)}
                                </div>
                                <img className='charity-box-image' src={CharityBox} alt="" />
                            </Droppable>
                            <div className="container">
                                <div className="sum-wrapper">
                                    <div>הסכום שהצטבר בקופה:</div>
                                    <h2 className="sum"><span>₪</span>{user.totalAmount || 0}</h2>
                                </div>
                                <div className="coins-wrapper">
                                    {child
                                        ? (displayCoins.filter(coin => (child && coin.props) && coin.props.id !== child.id))
                                        : displayCoins}
                                </div>
                            </div>
                        </DndContext>
                        <ManualAmountBar/>
                    </div>) :
                    <FirstEntry />
            }
        </div>
    )
}
