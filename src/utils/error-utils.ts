import {AppActionsType, setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {BaseResponseType} from '../api/todolist-api';
import {Dispatch} from 'redux';

export const handleAppError = <T>(dispatch: Dispatch<AppActionsType>, data: BaseResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some occurred error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleNetworkError = (dispatch: Dispatch<AppActionsType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}