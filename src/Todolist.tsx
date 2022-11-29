import React from 'react';
import {Header} from './components/Header';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {Button, Checkbox, IconButton} from '@mui/material';
import {blue} from '@mui/material/colors';

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TasksType>
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeStatus: (todolistID: string, taskID: string, taskIsDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    updateTodolist: (todolistID: string, newTitle: string) => void
}
export const Todolist = (props: PropsType) => {

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todolistID, value)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const AddTaskHandler = (newTitle: string) => {
        return props.addTask(props.todolistID, newTitle)
    }

    const updateTaskHandler = (taskID: string, newTitle: string) => {
        props.updateTask(props.todolistID, taskID, newTitle)
    }

    const updateTodolist = (newTitle: string) => {
        props.updateTodolist(props.todolistID, newTitle)
    }

    return (
        <div>
            <Header changeTitle={updateTodolist} name={'x'} callback={removeTodolistHandler}
                    title={props.title}
            />

            <AddItemForm callback={AddTaskHandler}/>

            <div>
                {props.tasks.map(t => {
                        const removeTaskHandler = (tId: string) => {
                            props.removeTask(props.todolistID, tId)
                        }
                        return (
                            <div key={t.id}
                                 className={t.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={(e) => {
                                        props.changeStatus(props.todolistID, t.id, e.currentTarget.checked)
                                    }}
                                    sx={{
                                        color: blue[800],
                                        '&.Mui-checked': {
                                            color: blue[600],
                                        },
                                    }}
                                />

                                <EditableSpan title={t.title}
                                              callback={(newTitle: string) => updateTaskHandler(t.id, newTitle)}/>
                                <IconButton onClick={() => removeTaskHandler(t.id)}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    }
                )}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterHandler('all')} color="info">All</Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterHandler('active')} color="secondary">Active</Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterHandler('completed')} color="error">Completed</Button>
            </div>
        </div>
    )
};