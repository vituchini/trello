import React from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
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

    function removeTask(todolistID: string, taskID: string) {
        dispatch(removeTaskAC(todolistID, taskID))
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }

    function addTask(todolistID: string, title: string) {
        dispatch(addTaskAC(todolistID, title))
    }

    function updateTask(todolistID: string, taskID: string, newTitle: string) {
        dispatch(changeTaskTitleAC(todolistID, taskID, newTitle))
    }

    function addTodolist(newTitle: string) {
        dispatch(addTodolistAC(newTitle))
    }

    function updateTodolistTitle(todolistID: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }

    function changeStatus(todolistID: string, taskID: string, taskIsDone: boolean) {
        dispatch(changeTaskStatusAC(todolistID, taskID, taskIsDone))
    }

    function removeTodolist(todolistID: string) {
        dispatch(removeTodolistAC(todolistID))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                        }


                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todolistID={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
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
