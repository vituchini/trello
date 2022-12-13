import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {blue} from '@mui/material/colors';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskStatuses, TaskType} from '../../api/todolist-api';

type TaskPropsType = {
    changeStatus: (todolistID: string, taskID: string, status: TaskStatuses) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    task: TaskType
    todolistID: string
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const removeTaskHandler = () => {
        props.removeTask(props.todolistID, props.task.id)
    }
    const updateTaskHandler = useCallback((newTitle: string) => {
        props.updateTask(props.todolistID, props.task.id, newTitle)
    }, [props.updateTask, props.todolistID, props.task.id])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todolistID, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }

    return (
        <div key={props.task.id}
             className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
                sx={{
                    color: blue[800],
                    '&.Mui-checked': {
                        color: blue[600],
                    },
                }}
            />

            <EditableSpan title={props.task.title}
                          callback={updateTaskHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})