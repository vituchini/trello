import React, {useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {blue} from '@mui/material/colors';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {TasksType} from './Todolist';

type TaskPropsType = {
    changeStatus: (todolistID: string, taskID: string, taskIsDone: boolean) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    task: TasksType
    todolistID: string
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const removeTaskHandler = (tId: string) => {
        props.removeTask(props.todolistID, tId)
    }
    const updateTaskHandler = useCallback((newTitle: string) => {
        props.updateTask(props.todolistID, props.task.id, newTitle)
    }, [props.updateTask, props.todolistID, props.task.id])
    return (
        <div key={props.task.id}
             className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.isDone}
                onChange={(e) => {
                    props.changeStatus(props.todolistID, props.task.id, e.currentTarget.checked)
                }}
                sx={{
                    color: blue[800],
                    '&.Mui-checked': {
                        color: blue[600],
                    },
                }}
            />

            <EditableSpan title={props.task.title}
                          callback={updateTaskHandler}/>
            <IconButton onClick={() => removeTaskHandler(props.task.id)}>
                <Delete/>
            </IconButton>
        </div>
    )
})