import React, { useRef, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useState } from 'react';

export function Droppable(props) {
    const { isOver, setNodeRef, node } = useDroppable({
        id: props.id,
    });
    const [isDropped, setIsDropped] = useState('')

    const style = {
        border: isOver ? '4px solid green' : undefined,
    };

    useEffect(() => {
        const droppedCoin = props.children[0].props.children.props;
        // console.log('droppedCoin:', droppedCoin);
        if (droppedCoin) {
            setTimeout(() => {
                setIsDropped('is-dropped');
            }, 400);
        }
    }, [props.children])


    return (
        <div className={`${props.className} ${isDropped}`} ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}