import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {BaseResponseType} from '../api/todolist-api';
import {Dispatch} from 'redux';

export const handleAppError = <T>(dispatch: Dispatch, data: BaseResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some occurred error'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleNetworkError = (dispatch: Dispatch, error: { message: string }) => {
    dispatch(setAppErrorAC(error.message ? {error: error.message} : {error: 'Some occurred error'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}