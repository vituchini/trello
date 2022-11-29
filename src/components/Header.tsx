import React from 'react';
import {EditableSpan} from '../EditableSpan';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

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
            <IconButton onClick={props.callback} name={props.name}>
                <Delete/>
            </IconButton>
        </h3>
    );
};