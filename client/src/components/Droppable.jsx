import React, { useRef, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useState } from 'react';

import { message } from 'antd';

/** Global State */
import { state } from '../state';
import { proxy, useSnapshot } from 'valtio';

import setLocalStorage from '../setLocalStorage';
import { UpdateData } from '../serverRequests';
import { useNavigate } from 'react-router-dom';

export function Droppable(props) {
    const { user } = useSnapshot(state);
    const { isOver, setNodeRef, node } = useDroppable({
        id: props.id,
    });
    const [isDropped, setIsDropped] = useState('')
    const [response, setResponse] = useState()
    const navigate = useNavigate();

    const style = {
        border: isOver ? '4px solid green' : undefined,
    };

    const updateTotalAmount = (value) => {
        const id = user._id;
        const where = "totalAmount";
        const updatedValue = user.totalAmount + value;
        console.log("value to donate:", value);
        UpdateData(`/api/updateUser/${id}`, { where, value: updatedValue }, setResponse);
    }

    useEffect(() => {
        if (response) {
            if (response.user && state) {
                console.log("response:", response);
                setLocalStorage("user", response.user)
                    .then((user) => {
                        state.user = user;
                    })
            } else if (response.status === 406) {
                message.warning('המשתמש משום מה כבר לא קיים אצלנו במערכת. התחבר/הירשם מחדש.');
                setLocalStorage("user", "remove");
                state.user = {};
            }
        }
    }, [response])


    useEffect(() => {
        const droppedCoin = props.children[0].props.children.props;
        if (droppedCoin) {
            setTimeout(() => {
                setIsDropped('is-dropped');
                setTimeout(() => {
                    setIsDropped('');
                    updateTotalAmount(droppedCoin.value);
                    // state.user.totalAmount += droppedCoin.value;
                }, 400);
            }, 400);
        }
    }, [props.children])

    return (
        <div className={`${props.className} ${isDropped}`} ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}