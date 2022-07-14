import React, { useState } from 'react';
import { Button, Drawer, Divider } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import Settings from './Settings';

/** Global State */
import { state } from '../../../state';
import { useSnapshot, subscribe } from 'valtio';


function Header() {
    const { user } = useSnapshot(state);
    const userName = `${user.personalInfo.firstName} ${user.personalInfo.lastName}`;
    const phoneNumber = user.personalInfo.phoneNumber;
    const [visible, setVisible] = useState(false);

    const showMenu = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const showSettings = () => {
        
    } ;

    const menu = (
        <Drawer 
            title="הגדרות" 
            placement="right" 
            onClose={onClose} 
            visible={visible} 
            width="60%"
            id="DrawerMain"
        >
            {/* <div>
                <h2>{userName}</h2>
                <div>{phoneNumber}</div>
            </div> */}
            <Settings title={"פרטים אישיים"}/>
            <Divider/>
            <Settings title={"ניהול תזכורת"}/>
            <Divider/>
            <Settings title={"הגדרות תצוגה"}/>
            <Divider/>
            <Settings title={"פרטי כרטיס אשראי"}/>
            <Divider/>
        </Drawer>
    );

    return (
        <div className="Header">
            <Button type="text" onClick={showMenu}>
                <MenuOutlined />
            </Button>
            {menu}
            <h2>קופת צדקה דיגיטלית</h2>
        </div>
    )
}

export default Header