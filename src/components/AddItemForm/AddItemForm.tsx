import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

type PropsType = {
    callback: (newTitle: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<PropsType> = React.memo(({disabled = false, callback}) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const addItem = () => {
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
            addItem()
        }
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       disabled={disabled}
                       label={error ? 'Title is required' : 'Enter title'}
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton color="primary" onClick={addItem} disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    );
});

