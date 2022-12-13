import {AddTodolistActionType, FetchTodolistsActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../../api/todolist-api';
import {AppActionsType, AppRootStateType, AppThunk} from '../../app/store';
import {Dispatch} from 'redux';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    ...action.model
                } : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case 'FETCH-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state
    }
}

// actions
export const removeTaskAC = (todolistId: string, taskId: string,) =>
    ({type: 'REMOVE-TASK', todolistId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', todolistId, taskId, model} as const)
export const fetchTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: 'FETCH-TASKS', todolistId, tasks} as const)

// thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(fetchTasksAC(todolistId, res.data.items))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
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
        todolistAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                dispatch(updateTaskAC(todolistId, taskId, model))
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
export type TasksActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | FetchTodolistsActionType
    | ReturnType<typeof fetchTasksAC>

