import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {FieldErrorType} from '../api/types';
import {rootReducer} from '../app/reducers';

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }