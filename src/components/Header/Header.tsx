import React from 'react';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {TodolistDomainType} from '../../features/TodolistsList/todolists-reducer';

type PropsType = {
    title: string
    name: string
    callback: () => void
    changeTitle: (newTitle: string) => void
    todolist: TodolistDomainType
}

export const Header = (props: PropsType) => {
    return (
        <h3>
            <EditableSpan title={props.title} callback={props.changeTitle}/>
            <IconButton onClick={props.callback} name={props.name} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
    );
};