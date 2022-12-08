import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const turnOnHandler = () => {
        setEditMode(true)
        setNewTitle(props.title)
    }

    const turnOffHandler = () => {
        setEditMode(false)
        props.callback(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField id="standard-basic"
                     label="Edit value"
                     variant="standard"
                     value={newTitle}
                     onBlur={turnOffHandler}
                     autoFocus
                     onChange={onChangeHandler}
        />
        : <span onDoubleClick={turnOnHandler}>{props.title}</span>
})