import React, { useEffect, useState, useRef } from 'react';

/** Components */
import FirstEntry from './FirstEntry';
import CharityBox from './CharityBox/CharityBox';

import setLocalStorage from '../../setLocalStorage';


export default function Home({ store, snap }) {
    // console.log("snap.user:", snap.user === 'empty');
    const [isConnected, setIsConnected] = useState(false); // Check if user logged-in.


    /** Insert the LocalStorage to the global state. */
    const initializeState = async() => {
        try {
            store.user = await setLocalStorage("user");
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        initializeState();
    }, []);


    useEffect(() => {
        if (snap.user === "empty" || snap.user === null) {
            console.log("the store is empty!");
            setIsConnected(false)
        } else {
            console.log("the store is full");
            setIsConnected(true);
        }
    }, [snap.user]);

    return (
        <div className='Home'>
            {
                isConnected
                    ? <CharityBox store={store} user={snap.user} />
                    : <FirstEntry />
            }
        </div>
    )
}
