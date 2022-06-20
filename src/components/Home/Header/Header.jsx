import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import Settings from './Settings';

function Header() {
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
        >
            <Settings title={"פרטים אישיים"}/>
            <Settings title={"הגדרות תצוגה"}/>
            <Settings title={"פרטי כרטיס אשראי"}/>
            <Settings title={"הגדרות תזכורת"}/>
            {/* <p>פרטי כרטיס אשראי</p>
            <p>עריכת פרטים אישיים</p>
            <p>הגדרות תצוגה</p>
            <p>הגדרות נוספות</p> */}
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