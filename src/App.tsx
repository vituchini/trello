import React, {useState} from 'react';
import './App.css';
import {Header} from './components/Header';
import {v1} from 'uuid';
import {Todolist} from './Todolist';

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), name: 'HTML&CSS', isDone: true},
        {id: v1(), name: 'JS', isDone: true},
        {id: v1(), name: 'React', isDone: false},
    ])

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist tasks={tasks}
                      removeTask={removeTask}
            />

        </div>
    );
}

export default App;
