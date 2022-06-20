import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu, message, InputNumber } from 'antd';

import Header from './Header/Header';
import Shekel from "../../assets/images/shekel_tails.svg";
import CharityBox from "../../assets/images/charity_box.png"

const firstEntry = (
    <>
        <h1 className='entry-title'>קופת הצדקה הדיגיטלית שלך</h1>
        <Link to="/Signup">
            <Button>בואו נתחיל!</Button>
        </Link>
    </>
)

const coin = (
    <img src={Shekel} alt={Shekel} />
)

// useEffect(() => {

// }, [])

export default function Home() {
    return (
        <div className='Home'>
            {/* { firstEntry } */}
            <Header/>
            {/* <h1>עֵץ חַיִּים הִיא לַמַּחֲזִיקִים בָּהּ וְתֹמְכֶיהָ מְאֻשָּׁר</h1> */}
            <div className="charity-box">
                <img src={CharityBox} alt="" />
            </div>
            <div className="container">
                <div className="sum-wrapper">
                    <p>הסכום שהצטבר בקופה:</p>
                    <div className="sum">{"24.50"}₪</div>
                </div>
                <div className="coins-wrapper">
                    {coin}
                    {coin}
                    {coin}
                    {coin}
                </div>
            </div>
            <div className="other-amount-wrapper">
                <label>סכום אחר:</label>
                <InputNumber
                    defaultValue={13}
                    formatter={(value) => `₪ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
                <Button>הכנס ↑</Button>
            </div>
        </div>
    )
}
