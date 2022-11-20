import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), name: 'HTML&CSS', isDone: true},
        {id: v1(), name: 'JS', isDone: true},
        {id: v1(), name: 'React', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(title: string) {
        let task = {id: v1(), name: title, isDone: true};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }



    return (
        <div className="App">
            <Todolist tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />

        </div>
    );
}

export default App;
