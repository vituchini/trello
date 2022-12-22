import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {authAPI} from '../api/todolist-api';
import {handleAppError, handleNetworkError} from '../utils/error-utils';
import {AxiosError} from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from './store';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setAppErrorAC(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error;
        },
        setInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized;
        }
    }
})

export const appReducer = slice.reducer;
export const {setAppStatusAC, setAppErrorAC, setInitializedAC} = slice.actions;

// thunks

export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleAppError(dispatch, res.data)
        }
        dispatch(setInitializedAC({isInitialized: true}))
    })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error)
        })
}