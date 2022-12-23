import React, {useCallback, useEffect} from 'react';
import './App.css';
import {CircularProgress, Container, LinearProgress} from '@mui/material';
import {TodolistsList} from '../features/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {authActions, authSelectors, Login} from '../features/Auth';
import {appActions} from '../features/Application';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {selectIsInitialized, selectStatus} from './selectors';
import {lightGreen, lime} from '@mui/material/colors';
import {useActions, useAppSelector} from '../utils/redux-utils';
import {TaskType} from '../api/types';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const status = useAppSelector(selectStatus)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const isInitialized = useAppSelector(selectIsInitialized)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    const logoutHandler = useCallback(() => {
        logout()
    }, [])

    useEffect(() => {
        if (!isInitialized) {
            initializeApp()
        }
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress color="success"/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static" sx={{
                color: lightGreen[900],
                backgroundColor: lime['A700']
            }}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit"
                                aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TODOLIST
                    </Typography>
                    {isLoggedIn &&
                        <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                </Toolbar>
                <div style={{height: '4px'}}>
                    {status === 'loading' && <LinearProgress color={'success'}/>}
                </div>
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={false}/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                    <Route path={'404'} element={<h1
                        style={{display: 'flex', justifyContent: 'center'}}>
                        404: PAGE NOT FOUND
                    </h1>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
