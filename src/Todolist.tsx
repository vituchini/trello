import React, {useState} from 'react';
import {Header} from './components/Header';
import {FilterValuesType} from './App';
import {Button} from './components/Button';

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TasksType>
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeStatus: (todolistID: string, taskID: string, taskIsDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
}
export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todolistID, value)
    }

    const addTaskHandler = () => {
        let trimmedTask = title.trim()
        if (trimmedTask) {
            props.addTask(props.todolistID, trimmedTask)
        } else {
            setError('Title is required')
        }
        setTitle('')
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    return (
        <div>
            <Header name={'x'} callback={removeTodolistHandler}
                    title={props.title}
            />
            <div>
                <input className={error ? 'error' : ''} value={title}
                       onChange={(e) => {
                           setTitle(e.currentTarget.value)
                           setError('')
                       }}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                               addTaskHandler()
                           }
                       }}
                />
                <Button name={'+'} callback={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                        const removeTaskHandler = (tId: string) => {
                            props.removeTask(props.todolistID, tId)
                        }
                        return (
                            <li key={t.id}
                                className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={(e) => {
                                           props.changeStatus(props.todolistID, t.id, e.currentTarget.checked)
                                       }}
                                />
                                <span>{t.title}</span>
                                <Button name={'x'} callback={() => removeTaskHandler(t.id)}/>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <Button className={props.filter === 'all' ? 'btn-active' : ''} name={'All'}
                        callback={() => changeFilterHandler('all')}/>
                <Button className={props.filter === 'active' ? 'btn-active' : ''} name={'Active'}
                        callback={() => changeFilterHandler('active')}/>
                <Button className={props.filter === 'completed' ? 'btn-active' : ''} name={'Completed'}
                        callback={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    )
        ;
};