import React from 'react';
import {Button} from './Button';
import {EditableSpan} from '../EditableSpan';

type PropsType = {
    title: string
    name: string
    callback: () => void
    changeTitle: (newTitle: string) => void
}

export const Header = (props: PropsType) => {
    return (
        <h3>
            <EditableSpan title={props.title} callback={props.changeTitle}/>
            <Button name={props.name} callback={props.callback}/>
        </h3>
    );
};