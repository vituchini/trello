import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
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
        ? <input value={newTitle}
                 onBlur={turnOffHandler}
                 autoFocus
                 onChange={onChangeHandler}
        />
        : <span onDoubleClick={turnOnHandler}>{props.title}</span>
}