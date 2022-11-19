import React from 'react';
import './App.css';
import {Header} from './components/Header';
import {v1} from 'uuid';
import {Todolist} from './Todolist';

function App() {

    let tasks = [
        {id: v1(), name: 'HTML&CSS', isDone: true},
        {id: v1(), name: 'JS', isDone: true},
        {id: v1(), name: 'React', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist tasks={tasks}  />

        </div>
    );
}

export default App;
