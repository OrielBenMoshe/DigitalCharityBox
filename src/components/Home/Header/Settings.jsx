import React, { useState, useEffect, useRef } from "react";
import { Button, Drawer } from "antd";
import {
  BellOutlined,
  CreditCardOutlined,
  UserOutlined,
  SketchOutlined,
} from "@ant-design/icons";

import DisplaySettings from "../../settings/DisplaySettings";
import MemoSettings from "../../settings/MemoSettings";
import CreditDetailsForm from "../../settings/CreditDetailsForm";
import PersonalDetailsForm from "../../settings/PersonalDetailsForm";

export default function Settings(props) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState();
  const [icon, setIcon] = useState(null);
  
  const [personalForm, setPersonalForm] = useState();
  const refForm = useRef(null);

  const showSettings = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const formHandle = (ref) => {
    if (!ref.response) {
        setPersonalForm(ref)
    } else {

    }
}

  useEffect(() => {
    setContent(() => {
      switch (props.title) {
        case "ניהול תזכורת":
          return <MemoSettings />;
        case "פרטים אישיים":
          return <PersonalDetailsForm ref={refForm} formHandle={formHandle} />;
        case "הגדרות תצוגה":
          return <DisplaySettings />;
        case "פרטי כרטיס אשראי":
          return <CreditDetailsForm />;
        default:
          break;
      }
    });
    setIcon(() => {
      switch (props.title) {
        case "ניהול תזכורת":
          return <BellOutlined />;
        case "פרטים אישיים":
          return <UserOutlined />;
        case "הגדרות תצוגה":
          return <SketchOutlined />;
        case "פרטי כרטיס אשראי":
          return <CreditCardOutlined />;
        default:
          break;
      }
    });
  }, []);

  return (
    <div className="Settings-item">
      <Button type="text" onClick={showSettings}>
        {" "}
        {icon} {props.title}
      </Button>
      <Drawer
        // title={props.title}
        placement="left"
        onClose={onClose}
        visible={visible}
        width="100%"
      >
        {content}
      </Drawer>
    </div>
  );
}
