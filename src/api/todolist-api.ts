import axios, {AxiosResponse} from 'axios'
import {RequestStatusType} from '../app/app-reducer';

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    withCredentials: true,
    headers: {
        'API-KEY': 'ee7769c8-821f-475b-be91-ea9e1f4fc86c'
    }
})

// api
export const todolistAPI = {
    getTodolists: () => {
        return instance.get<Array<TodolistType>>(`/todo-lists`)
    },
    createTodolist: (title: string) => {
        return instance.post<'', AxiosResponse<BaseResponseType<{ item: TodolistType }>>, { title: string }>(`/todo-lists`, {title})
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist: (todolistId: string, title: string) => {
        return instance.put<AxiosResponse<BaseResponseType>>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks: (todolistId: string) => {
        return instance.get<ResponseTasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<'', AxiosResponse<BaseResponseType<{ item: TaskType }>>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask: (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
        return instance.put<UpdateTaskModelType, AxiosResponse<BaseResponseType<{ item: TaskType }>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<BaseResponseType<{ userId: string }>>>('/auth/login', data)
    },
    logout() {
        return instance.delete<LoginParamsType, AxiosResponse<BaseResponseType<{ userId: string }>>>('/auth/login')
    },
    me() {
        return instance.get<BaseResponseType<AuthMeType>>('/auth/me')
    }
}


// types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type BaseResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}
type ResponseTasksType = {
    items: Array<TaskType>
    error: string | null
    totalCount: number
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export type AuthMeType = {
    id: number
    email: string
    login: string
}