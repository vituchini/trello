import {addTodolistAC, fetchTodolistsAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../../api/todolist-api';
import {AppRootStateType, AppThunk} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {handleAppError, handleNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        fetchTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(fetchTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        })
    }
})

export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, fetchTasksAC} = slice.actions

// thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(fetchTasksAC({todolistId, tasks: res.data.items}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC({todolistId, taskId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error)
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const allAppTasks = state.tasks
    const tasksForCurrentTodolist = allAppTasks[todolistId]
    const changedTask = tasksForCurrentTodolist.find((t) => {
        return t.id === taskId
    })
    if (changedTask) {
        const model: UpdateTaskModelType = {
            title: changedTask.title,
            description: changedTask.description,
            status: changedTask.status,
            priority: changedTask.priority,
            startDate: changedTask.startDate,
            deadline: changedTask.deadline,
            ...domainModel
        }
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({todolistId, taskId, model}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleAppError(dispatch, res.data)
                }
            })
            .catch((error: AxiosError) => {
                handleNetworkError(dispatch, error)
            })
    }
}

// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

