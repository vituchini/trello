import React from 'react';
import {Button} from './Button';

type PropsType = {
    title: string
    name: string
    callback: () => void
}

export const Header = (props: PropsType) => {
    return (
        <h3>{props.title}
            <Button name={props.name}  callback={props.callback}/>
        </h3>
    );
};