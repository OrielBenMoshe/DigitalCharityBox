import React, { useState, useEffect, useRef } from "react";
import { Button, Drawer, message } from "antd";
import {
  BellOutlined,
  CreditCardOutlined,
  UserOutlined,
  SketchOutlined,
} from "@ant-design/icons";

/** Components */
import DisplaySettings from "../../settings/DisplaySettings";
import MemoSettings from "../../settings/MemoSettings";
import CreditDetailsForm from "../../settings/CreditDetailsForm";
import PersonalDetailsForm from "../../settings/PersonalDetailsForm";

/** Valtio */
import { state } from "../../../state";
import { useSnapshot } from "valtio";

import { UpdateData } from "../../../serverRequests";
import setLocalStorage from "../../../setLocalStorage";

export default function Settings(props) {
  const snap = useSnapshot(state);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState();
  const [icon, setIcon] = useState(null);
  const [formRef, setFormRef] = useState();
    
  /** User data from the state */
  const [userDetails, setUserDetails] = useState(snap.user.personalInfo);
  const [display, setDisplay] = useState(snap.user.display);
  const [reminders, setReminders] = useState(snap.user.reminders);
  const [update, setUpdate] = useState();
  const [response, setResponse] = useState();
  

  /** Create a reference to the form here in the parent component. */
  const formRefForward = (ref) => {
    setFormRef(ref)
  }

  /** On form submited the response come here. */
  const formResponse = (response) => {
    if (response === "success") {
      setVisible(false);
    };
  }

  const showSettings = () => {
    setVisible(true);
  };

  const onClose = (updatedData) => {
    console.log("updatedData:", updatedData);
    const data = {
      where: "display",
      value: {coins: [...updatedData]}
    }
    UpdateData(`/api/updateUser/${snap.user._id}`, data, setResponse);
  };

  const updateLocalStrogeAndState = async () => {
    state.user = await setLocalStorage("user", response.user);
  }
  
  useEffect(() => {
    if (response) {
      console.log("response:", response);
      if (response.isSucceed) {
        updateLocalStrogeAndState()
        message.success("ההגדרות נשמרו בהצלחה")
      } else {
        message.error("משהו השתבש, נסה במועד מאוחר יותר..")
      }
      setVisible(false);
    }

  }, [response])


  useEffect(() => {
    setContent(() => {
      switch (props.title) {
        case "פרטים אישיים":
          return <PersonalDetailsForm
            formResponse={formResponse}
            formRefForward={formRefForward}
            setUserDetails={setUserDetails}
            userDetails={userDetails}
            isSignup={false}
          // store={state.user.personalInfo}
          // snap={snap.user.personalInfo}
          />;
        case "הגדרות תצוגה":
          return <DisplaySettings
            display={display}
            setDisplay={setDisplay}
            onClose={onClose}
          />;
        case "ניהול תזכורת":
          return <MemoSettings
            reminders={reminders}
            setReminders={setReminders}
            onClose={onClose}
          />;
        case "פרטי כרטיס אשראי":
          return <CreditDetailsForm
          />;
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
