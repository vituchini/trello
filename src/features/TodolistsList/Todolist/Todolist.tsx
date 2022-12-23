import React, {useCallback, useEffect} from 'react';
import {Header} from '../../../components/Header/Header';
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {Button} from '@mui/material';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolist-api';
import {useAppDispatch} from '../../../app/store';
import {fetchTasksTC} from '../tasks-reducer';

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    removeTodolist: (todolistID: string) => void
    updateTodolist: (todolistID: string, newTitle: string) => void
    changeStatus: (todolistID: string, taskID: string, status: TaskStatuses) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const changeFilterHandler = useCallback((value: FilterValuesType) => {
        props.changeFilter(props.todolist.id, value)
    }, [props.changeFilter, props.todolist.id])

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolist.id)
    }

    const AddTaskHandler = useCallback((newTitle: string) => {
        return props.addTask(props.todolist.id, newTitle)
    }, [props.addTask, props.todolist.id])

    const updateTodolist = useCallback((newTitle: string) => {
        props.updateTodolist(props.todolist.id, newTitle)
    }, [props.updateTodolist, props.todolist.id])

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }

    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <Header changeTitle={updateTodolist} name={'x'} callback={removeTodolistHandler}
                    title={props.todolist.title} todolist={props.todolist}
            />

            <AddItemForm callback={AddTaskHandler} disabled={props.todolist.entityStatus === 'loading'}/>

            <div>
                {tasksForTodolist.map(t =>
                    <Task key={t.id}
                          task={t}
                          changeStatus={props.changeStatus}
                          updateTask={props.updateTask}
                          removeTask={props.removeTask}
                          todolistID={props.todolist.id}
                    />
                )}
            </div>
            <div>
                <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterHandler('all')} color="info">All</Button>
                <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterHandler('active')} color="secondary">Active</Button>
                <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterHandler('completed')} color="error">Completed</Button>
            </div>
        </div>
    )
});

