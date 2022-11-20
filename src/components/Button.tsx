import React from 'react';

type PropsType = {
    name: string
    callback: () => void
}

export const Button = (props: PropsType) => {

    const onClickHandler = () => {
        props.callback()
    }

    return (
        <button name={props.name} onClick={onClickHandler}>{props.name}</button>
    );
};