import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { GetData } from '../../getData';

import Iframe from 'react-iframe';
import { Button } from 'antd';



export default function CreditDetailsForm() {
    // const { data, loading, error } = useAxios('get','sumit/getGateway');
    const [gateway, setGateway] = useState('')

    // useEffect(() => {
    //    data && setGateway(data.RedirectURL);
    // }, [data]);

    // useEffect(() => {
       
    // }, [loading]);

    // useEffect(() => {
    //     error && console.log("error:", error); 
    // }, [error]);
    useEffect(() => {
        GetData('/api/sumit/getGateway', setGateway);
    }, []);


    return (
        <div className='settings CreditDetailsForm'>
            <div className='headers'>
                <h1>פרטי כרטיס אשראי</h1>
                <h3>כדי שנוכל לקבל את התרומה שלך!</h3>
            </div>
            <Button href={gateway && gateway.RedirectURL}>שמירת פרטי אשראי במערכת הסליקה</Button>
            {/* <Iframe allow="fullscreen" url={gateway} height="100%" width="100%" id='gateway' loading={'∆∆∆'} overflow/> */}
        </div>
    )
}
