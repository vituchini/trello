import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../../api/todolist-api';
import {AppRootStateType} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {handleAppError, handleNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistAPI.getTasks(todolistId);
    const tasks = res.data.items
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolistId, tasks};
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, taskId: string }, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    await todolistAPI.deleteTask(param.todolistId, param.taskId)
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolistId: param.todolistId, taskId: param.taskId}
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todolistId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistAPI.createTask(param.todolistId, param.title);
    try {
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return task
        } else {
            handleAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError
        handleNetworkError(dispatch, error)
        return rejectWithValue(null)
    }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { todolistId: string, taskId: string, model: UpdateDomainTaskModelType }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppRootStateType
    const allAppTasks = state.tasks
    const tasksForCurrentTodolist = allAppTasks[param.todolistId]
    const changedTask = tasksForCurrentTodolist.find((t) => {
        return t.id === param.taskId
    })
    if (!changedTask) {
        return rejectWithValue('task not found in the state')
    }

    const apiModel: UpdateTaskModelType = {
        title: changedTask.title,
        description: changedTask.description,
        status: changedTask.status,
        priority: changedTask.priority,
        startDate: changedTask.startDate,
        deadline: changedTask.deadline,
        ...param.model
    }
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistAPI.updateTask(param.todolistId, param.taskId, apiModel);
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return param
        } else {
            handleAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError
        handleNetworkError(dispatch, error)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})

export const tasksReducer = slice.reducer

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

