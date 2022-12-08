import React, {useCallback} from 'react';
import './App.css';
import {TasksType, Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {Container, Grid, Paper} from '@mui/material';
import ButtonAppBar from './components/AppBar';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }, [dispatch])

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }, [dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [dispatch])

    const updateTask = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, newTitle))
    }, [dispatch])

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])

    const updateTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }, [dispatch])

    const changeStatus = useCallback((todolistID: string, taskID: string, taskIsDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, taskIsDone))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {

                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todolistID={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
