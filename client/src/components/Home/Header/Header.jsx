import React, { useState } from 'react';
import { Button, Drawer, Divider, Popconfirm } from 'antd';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';

import Settings from './Settings';

/** Global State */
import { state } from '../../../state';
import { useSnapshot, subscribe } from 'valtio';
import setLocalStorage from '../../../setLocalStorage';

import { logout } from '../../../firebase';

function Header() {
    const { user } = useSnapshot(state);
    // const userName = `${user.personalInfo.firstName} ${user.personalInfo.lastName}`;
    // const phoneNumber = user.personalInfo.phoneNumber;
    const [visibleDrawer, setVisibleDrawer] = useState(false);
    const [visiblePopconfirm, setVisiblePopconfirm] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showMenu = () => {
        setVisibleDrawer(true);
    };

    const onClose = () => {
        setVisibleDrawer(false);
    };

    const showPopconfirm = () => {
        setVisiblePopconfirm(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            setVisiblePopconfirm(false);
            logoutHandler();
        }, 1000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisiblePopconfirm(false);
    };

    const logoutHandler = () => {
        logout();
        setLocalStorage("user", "remove");
        window.location.reload(false);
    };

    const menu = (
        <Drawer
            title="הגדרות"
            placement="right"
            onClose={onClose}
            visible={visibleDrawer}
            width="60%"
            id="DrawerMain"
        >
            {/* <div>
                <h2>{userName}</h2>
                <div>{phoneNumber}</div>
            </div> */}
            <Settings title={"פרטים אישיים"} />
            <Divider />
            <Settings title={"הגדרות תצוגה"} />
            <Divider />
            <Settings title={"ניהול תזכורת"} />
            <Divider />
            <Settings title={"פרטי כרטיס אשראי"} />
            <Divider />
            <Popconfirm
                title="רצית להתנתק מהמערכת?"
                visible={visiblePopconfirm}
                onConfirm={handleOk}
                okButtonProps={{
                    loading: confirmLoading,
                }}
                onCancel={handleCancel}
                okText="כן"
                cancelText="התחרטתי"
                placement="topRight"
            >
                <Button type="text" className="logout-btn" icon={<LogoutOutlined />} onClick={showPopconfirm}>
                    התנתקות
                </Button>
            </Popconfirm>
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