import {todolistAPI, TodolistType} from '../api/todolist-api';
import {AppThunk} from './store';

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(el => {
                return {...el, filter: 'all' as FilterValuesType}
            })
        }
        default:
            return state
    }
}

// types
export type TodolistsActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof fetchTodolistsAC>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

// actions
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const fetchTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

// thunks
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(fetchTodolistsAC(res.data))
            })
    }
}
export const removeTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(fetchTodolistsTC())
            })

    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}


