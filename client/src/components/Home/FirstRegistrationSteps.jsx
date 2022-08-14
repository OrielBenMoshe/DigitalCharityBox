import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, Outlet, useSearchParams, useNavigate } from "react-router-dom";
import { Button, message, Steps, Spin } from 'antd';

/** Components */
import Register from '../Signup/Register';
import PersonalDetailsForm from '../settings/PersonalDetailsForm';
import CreditDetailsForm from '../settings/CreditDetailsForm';
import DisplaySettings from '../settings/DisplaySettings';
import MemoSettings from '../settings/MemoSettings';

import { GetData, PostData } from '../../serverRequests';
import setLocalStorage from '../../setLocalStorage';

/**
 * Registration process in the "Digital Charity Box" app:
 * 
 * 1. Fill in an email and password to register in Firebase Authetication 
 *    and receive a uid that is kept aside along with the email in the state.
 * 2. Fill in personal details and keep them aside in the state.
 * 3. Fill in credit information and receive back a secure token.
 * 4. Send a request to establish a customer in Sumit with name, email, phone and token 
 *    and receive back a CustomerID and PaymentMethod.
 * 5. Create a new customer in the DB from the following details: 
 *    uid, mail, personalDetails, customerId, expireDate, lastDigits.
 * 6. Update the localStorage and the Global State.
 * 7. Move the user to the home page. 
 */

export default function FirstRegistrationSteps({ store }) {
    const { Step } = Steps;
    const [searchParams, setSearchParams] = useSearchParams();
    const [creditCardToken, setCreditCardToken] = useState(searchParams.get("og-token"));
    const [current, setCurrent] = useState(0); // Represents the current step in the the flow.
    const [formRef, setFormRef] = useState();
    const [localStorageUser, setLocalStorageUser] = useState();
    const [userDetails, setUserDetails] = useState();
    const [sumitCustomer, setSumitCustomer] = useState(); // After a customer has been established in Sumit, customerId is received.
    const [DBUser, setDBUser] = useState(); // After adding User in MongoDb its goes in here.
    const navigate = useNavigate();

    useEffect(() => {
        creditCardToken && crearteSumitCustomer();
        checkUserInLocalStorage();
    }, [])

    /** You get here if a new Customer is created in Sumit CRM. */
    useEffect(() => {
        if (sumitCustomer && sumitCustomer.customerId) {
            // console.log("sumitCustomer:", sumitCustomer);
            addUserToDB();
        } else {
            // console.log("sumitCustomer:", sumitCustomer);
        }
    }, [sumitCustomer])

    /** You get here if a new user is created in the DB. */
    useEffect(() => {
        if (DBUser) {
            store.user = DBUser;
            localStorage.removeItem('temporaryUserDetails');
            setLocalStorage("user", DBUser);
            navigate('/Home');
        }
    }, [DBUser])

    useEffect(() => {
        // console.log("formRef:", formRef)
        userDetails && console.log("userDetails:", userDetails);
        userDetails && setLocalStorage("temporaryUserDetails", userDetails);
        // setLocalStorage("temporaryUserDetails").then((res) => console.log("localStorage:", res));

    }, [userDetails]);


    const checkUserInLocalStorage = async () => {
        try {
            const user = await setLocalStorage('user')
            console.log(user);
            if (user !== 'empty') {
                setLocalStorageUser(user);
                setLocalStorage("temporaryUserDetails", "remove")
                setLocalStorage("temporaryEmailPassword", "remove")
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            }

        } catch (error) {
            console.log(error);
        }
    }

    /** Create Customer in Sumit CRM */
    const crearteSumitCustomer = async () => {
        console.log("crearteSumitCustomer");
        try {
            const data = await setLocalStorage("temporaryUserDetails");
            data.token = creditCardToken;
            console.log("data:", data);
            PostData("/api/sumit/setCustomer", data, setSumitCustomer);
        } catch (error) {
            console.error(error);
        }
    }
    /** Add new User to MongoDB */
    const addUserToDB = async () => {
        console.log("addUserToDB");
        try {
            let data = await setLocalStorage("temporaryUserDetails");
            data = { ...data, ...sumitCustomer }
            console.log("data:", data);
            PostData("/api/addUser/", data, setDBUser)
        } catch (error) {
            console.error(error);
        }
    }


    /** The last step in the registration process. */
    const RegistrationEnd = () => {
        if (formRef) {
            console.log("formRef:", formRef);
            formRef.submit();
        }
        // message.success('...ההגדרות הראשוניות הושלמו בהצלחה, הקופה כבר מוכנה.');
        console.log({ ...userDetails, ...sumitCustomer });
        const data = { ...userDetails, ...sumitCustomer }
        /** Add new User to MongoDB */
        // PostData("/api/addUser/", data, setUserFromDB)
    }

    /** Steps navigation */
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    /** On form submited the response come here. */
    const formResponse = (response) => {
        response === "success" && next();
    }

    /** Create a reference to the form here in the parent component. */
    const formRefForward = (ref) => {
        setFormRef(ref)
    }

    const handleNextBtn = () => {
        if (formRef) {
            console.log("formRef:", formRef.value);
            formRef.submit();
        } else next();
    }

    const steps = [
        {
            content: <Register
                next={next}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
            />
        },
        {
            content: <PersonalDetailsForm
                formRefForward={formRefForward}
                formResponse={formResponse}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                isSignup
            />
        },
        {
            content: <CreditDetailsForm
                formRefForward={formRefForward}
                formResponse={formResponse}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
            />
        },
        // { content: <MemoSettings/> },
        // { content: <DisplaySettings/> },
    ];

    return (
        localStorageUser || creditCardToken
            ? <Spin size="large"/>
            : (
                <div className='FirstRegistrationSteps' >
                    <Steps current={current} size="small" direction="horizontal" responsive={false}>
                        {steps.map((item, key) => {

                            return (<Step key={key} title={item.title} />)
                        })}
                    </Steps>
                    <div className="steps-content">{steps[current] && steps[current].content}</div>
                    <div className="steps-action">
                        {current === 0 && (
                            <Link to="/Home">→ חזרה</Link>
                        )}
                        {current > 0 && (
                            <Button
                                style={{
                                    margin: '0 8px',
                                }}
                                onClick={() => prev()}
                            >
                                → חזרה
                            </Button>
                        )}
                        {current === 1 && (
                            <Button type="primary" onClick={handleNextBtn} style={{ marginInline: "auto 0" }}>
                                הבא ←
                            </Button>
                        )}
                        {/* {current === steps.length - 1 && (
                    <Button size='large' type="primary" onClick={RegistrationEnd}>
                        זהו, סיימנו!
                    </Button>
                )} */}
                    </div>
                </div>
            )
    )
}
