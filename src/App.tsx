import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TasksType, Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm';
import {Container, Grid, Paper} from '@mui/material';
import ButtonAppBar from './components/AppBar';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Pork', isDone: true},
            {id: v1(), title: 'Tomatoes', isDone: true},
            {id: v1(), title: 'Сucumbers', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Ketchup', isDone: false},
        ]
    });

    function removeTask(todolistID: string, taskID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(filtered => filtered.id === todolistID ? {...filtered, filter: value} : filtered))
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function updateTask(todolistID: string, taskID: string, newTitle: string) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

    function addTodolist(newTitle: string) {
        let newTodolistID = v1();
        setTodolists([{id: newTodolistID, title: newTitle, filter: 'all'}, ...todolists])
        setTasks({...tasks, [newTodolistID]: []})
    }

    function updateTodolistTitle(todolistID: string, newTitle: string) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl))
    }

    function changeStatus(todolistID: string, taskID: string, taskIsDone: boolean) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: taskIsDone} : t)
        })
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                        }


                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistID={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
