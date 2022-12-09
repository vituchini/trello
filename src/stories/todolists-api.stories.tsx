import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => [
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    ]

    return <div> {JSON.stringify(state)}
        <input placeholder={'Title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={createTodolist}>Create Todolist</button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={'Todolist ID'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <button onClick={deleteTodolist}>Delete Todolist</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolistTitle = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={'Todolist ID'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'Title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={updateTodolistTitle}>Update Todolist Title</button>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={'Todolist ID'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <button onClick={getTasks}>Get Tasks</button>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={'Todolist ID'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'Title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={createTask}>Create Task</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={'Todolist ID'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'Task ID'} value={taskId} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <button onClick={deleteTask}>Delete Task</button>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [description, setDescription] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTaskTitle = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: startDate,
            deadline: deadline,
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={'Todolist ID'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'Task ID'} value={taskId} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <input placeholder={'Title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <input placeholder={'Description'} value={description} onChange={(e) => {
            setDescription(e.currentTarget.value)
        }}/>
        <input placeholder={'Status'} value={status} onChange={(e) => {
            setStatus(+e.currentTarget.value)
        }}/>
        <input placeholder={'Priority'} value={priority} onChange={(e) => {
            setPriority(+e.currentTarget.value)
        }}/>
        <input placeholder={'StartDate'} value={startDate} onChange={(e) => {
            setStartDate(e.currentTarget.value)
        }}/>
        <input placeholder={'Deadline'} value={deadline} onChange={(e) => {
            setDeadline(e.currentTarget.value)
        }}/>
        <button onClick={updateTaskTitle}>Update Task Title</button>
    </div>
}