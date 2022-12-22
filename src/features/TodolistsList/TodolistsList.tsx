import React, {FC, useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './todolists-reducer';
import {addTaskTC, removeTaskTC, updateTaskTC} from './tasks-reducer';
import {TaskStatuses} from '../../api/todolist-api';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {TasksStateType} from '../../app/App';
import {Navigate} from 'react-router-dom';

type PropsType = {
    demo?: boolean
}

export const TodolistsList: FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch();

    const removeTask = useCallback((todolistID: string, taskID: string) => {
        !demo && dispatch(removeTaskTC(todolistID, taskID))
    }, [dispatch])

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id: todolistID, filter: value}))
    }, [dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        !demo && dispatch(addTaskTC(todolistID, title))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        !demo && dispatch(updateTaskTC(todolistID, taskID, {title: newTitle}))
    }, [dispatch])

    const addTodolist = useCallback((newTitle: string) => {
        !demo && dispatch(addTodolistTC(newTitle))
    }, [dispatch])

    const updateTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        !demo && dispatch(changeTodolistTitleTC(todolistID, newTitle))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistID: string, taskID: string, status: TaskStatuses) => {
        !demo && dispatch(updateTaskTC(todolistID, taskID, {status}))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        !demo && dispatch(removeTodolistTC(todolistID))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm callback={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl) => {

                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    updateTask={changeTaskTitle}
                                    updateTodolist={updateTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>)
}