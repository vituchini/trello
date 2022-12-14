import * as React from 'react';
import {useCallback} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {LinearProgress} from '@mui/material';
import {useAppSelector} from '../app/hooks';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../app/store';
import {logoutTC} from '../features/Login/auth-reducer';

export default function ButtonAppBar() {
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TODOLIST
                    </Typography>
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                </Toolbar>
                <div style={{height: '4px'}}>
                    {status === 'loading' && <LinearProgress/>}
                </div>
            </AppBar>
        </Box>
    );
}