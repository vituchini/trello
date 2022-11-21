import React, {useState} from 'react';
import {Header} from './components/Header';
import {FilterValuesType} from './App';
import {Button} from './components/Button';

type TasksType = {
    id: string
    name: string
    isDone: boolean
}

type PropsType = {
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (tId: string, taskIsDone: boolean) => void
}
export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
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
            <Header title={'What to learn'}/>
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
                            props.removeTask(tId)
                        }
                        return (
                            <li><input type="checkbox"
                                       checked={t.isDone}
                                       onChange={(e)=>{props.changeStatus(t.id, e.currentTarget.checked)}}
                            />
                                <span>{t.name}</span>
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