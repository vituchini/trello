import {todolistAPI, TodolistType} from '../../api/todolist-api';
import {AppDispatch, AppThunk} from '../../app/store';
import {AppActionsType, RequestStatusType, setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return state.map(el => el.id === action.id ? {...el, entityStatus: action.status} : el)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(el => {
                return {...el, filter: 'all' as FilterValuesType, entityStatus: 'idle'}
            })
        }
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title: title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    status
} as const)
export const fetchTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

// thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(fetchTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(fetchTodolistsTC())
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some occurred error'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })

}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}

// types
export type TodolistsActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | FetchTodolistsActionType
    | AppActionsType
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type FetchTodolistsActionType = ReturnType<typeof fetchTodolistsAC>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}