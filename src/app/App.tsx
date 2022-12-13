import React from 'react';
import './App.css';
import {Container} from '@mui/material';
import ButtonAppBar from '../components/AppBar';
import {TaskType} from '../api/todolist-api';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default App;
