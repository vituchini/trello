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
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].name}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].name}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].name}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};