import {TasksActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {appReducer} from './app-reducer';
import {AuthActionsType, authReducer} from '../features/Login/auth-reducer';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type ActionsType = TodolistsActionsType | TasksActionsType | AuthActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, ActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>();

// @ts-ignore
window.store = store;

