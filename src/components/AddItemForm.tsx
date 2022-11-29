import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

type PropsType = {
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
            <TextField id="outlined-basic"
                       label={error ? 'Title is required' : 'Enter title'}
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton color="primary" onClick={addTaskHandler}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

