import React, {useState} from 'react';
import {Header} from './components/Header';
import {FilterValuesType} from './App';

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
}
export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')

    return (
        <div>
            <Header title={'What to learn'}/>
            <div>
                <input value={title} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
                <button onClick={() => {
                    props.addTask(title)
                    setTitle('')
                }}>+
                </button>
            </div>
            <ul>
                {props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/>
                    <span>{t.name}</span>
                    <button onClick={() => props.removeTask(t.id)}>x</button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};