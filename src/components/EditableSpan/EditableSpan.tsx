import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
    disabled?: boolean
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({disabled = false, title, callback}) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const turnOnHandler = () => {
        setEditMode(true)
        setNewTitle(title)
    }

    const turnOffHandler = () => {
        setEditMode(false)
        callback(newTitle)
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
                     disabled={disabled}
        />
        : <span onDoubleClick={turnOnHandler}>{title}</span>
})