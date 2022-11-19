import React from 'react';
import {Header} from './components/Header';
import {v1} from 'uuid';

type TasksType = {
    id: string
    name: string
    isDone: boolean
}

type PropsType = {
    tasks: Array<TasksType>
    removeTask: (id: string) => void
}
export const Todolist = (props: PropsType) => {

    return (
        <div>
            <Header title={'What to learn'}/>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/>
                    <span>{t.name}</span>
                    <button onClick={() => props.removeTask(t.id)}>x</button>
                </li>)}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};