import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {authAPI} from '../api/todolist-api';
import {handleAppError, handleNetworkError} from '../utils/error-utils';
import {AxiosError} from 'axios';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)

export const setInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

// thunks

export const initializeAppTC = (): any => (dispatch: any) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleAppError(dispatch, res.data)
        }
        dispatch(setInitializedAC(true))
    })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}


// types
export type AppActionsType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setInitializedAC>