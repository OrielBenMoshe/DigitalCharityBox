import React, { useEffect, useState, useRef } from 'react';

/** Global State */
import { useSnapshot, subscribe } from 'valtio';

/** Components */
import FirstEntry from './FirstEntry';
import CharityBox from './CharityBox/CharityBox';


export default function Home({store}) {
    const { user } = useSnapshot(store);
    const [isConnected, setIsConnected] = useState(false); // Check if user logged-in.



    useEffect(() => {
        console.log("user:", user);
        user.firebaseUID && setIsConnected(true)
    }, [])
    
    return (
        <div className='Home'>
            {
                isConnected 
                    ? <CharityBox store={store} user={user}/> 
                    : <FirstEntry />
            }
        </div>
    )
}
