import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, Container} from '@mui/material';
import ButtonAppBar from '../components/AppBar';
import {TaskType} from '../api/todolist-api';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {initializeAppTC} from './app-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './store';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                    <Route path={'404'} element={<h1 style={{display: 'flex', justifyContent: 'center'}}>
                        404: PAGE NOT FOUND
                    </h1>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
