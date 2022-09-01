import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd';

import CharityBoxImage from "../../assets/images/charity_box.png";


export default function FirstEntry() {
    return (
        <div id='FirstEntry' className='container'>
            <img className='charity-box-image' src={CharityBoxImage} alt="" width={"100%"}/>
            <h1 className='entry-title'>קופת הצדקה הדיגיטלית שלך</h1>
            <Link to="/Signup" className='signup-link'>
                <Button>בואו נתחיל!</Button>
            </Link>
        </div>
    )
}
