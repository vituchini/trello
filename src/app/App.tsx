import React from 'react';
import './App.css';
import {Container} from '@mui/material';
import ButtonAppBar from '../components/AppBar';
import {TaskType} from '../api/todolist-api';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;
