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
    addTask: (title: string) => void
    changeStatus: (tId: string, taskIsDone: boolean) => void
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
            props.addTask(trimmedTask)
        } else {
            setError('Title is required')
        }
        setTitle('')
    }

    return (
        <div>
            <Header title={props.title}/>
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
                                           props.changeStatus(t.id, e.currentTarget.checked)
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
                <Button name={'All'} callback={() => changeFilterHandler('all')}/>
                <Button name={'Active'} callback={() => changeFilterHandler('active')}/>
                <Button name={'Completed'} callback={() => changeFilterHandler('active')}/>
            </div>
        </div>
    )
        ;
};