import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    withCredentials: true,
    headers: {
        'API-KEY': 'ee7769c8-821f-475b-be91-ea9e1f4fc86c'
    }
})

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
        return instance.put<BaseResponseType>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks: (todolistId: string) => {
        return instance.get<ResponseTasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<ResponseTasksType>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask: (todolistId: string, taskId: string, model: UpdateModelType) => {
        return instance.put<BaseResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}


type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type BaseResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ResponseTasksType = {
    items: Array<TaskType>
    error: string
    totalCount: number
}

type UpdateModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}