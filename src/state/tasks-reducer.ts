import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistAPI, UpdateDomainTaskModelType, UpdateTaskModelType} from '../api/todolist-api';
import {AppActionsType, AppRootStateType, AppThunk} from './store';
import {Dispatch} from 'redux';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    ...action.model
                } : el)
            }

        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case 'ADD-TODOLIST': {
            debugger
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(el => {
                stateCopy[el.id] = []
            })
            return stateCopy
        }
        case 'FETCH-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state
    }
}

// types
export type TasksActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | FetchTasksActionType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type FetchTasksActionType = ReturnType<typeof fetchTasksAC>

// actions
export const removeTaskAC = (todolistId: string, taskId: string,) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}
export const fetchTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: 'FETCH-TASKS', todolistId, tasks} as const
}


// thunks
export const fetchTasksTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(fetchTasksAC(todolistId, res.data.items))
            })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {
    return (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
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

}

