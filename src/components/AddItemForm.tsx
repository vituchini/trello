import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';

type PropsType = {
    // todolistID: string
    // addTask: (todolistID: string, title: string) => void
    callback: (newTitle: string) => void
}

export const AddItemForm: React.FC<PropsType> = ({callback}) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const addTaskHandler = () => {
        let trimmedTask = title.trim()
        if (trimmedTask) {
            callback(trimmedTask)
        } else {
            setError('Title is required')
        }
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''} value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <Button name={'+'} callback={addTaskHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

