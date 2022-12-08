import React, {useReducer} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TasksType, Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {Container, Grid, Paper} from '@mui/material';
import ButtonAppBar from './components/AppBar';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

let todolistID1 = v1();
let todolistID2 = v1();

function AppWithReducers() {


    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(removeTaskAC(todolistID, taskID))
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatchToTodolist(changeTodolistFilterAC(todolistID, value))
    }

    function addTask(todolistID: string, title: string) {
        dispatchToTasks(addTaskAC(todolistID, title))
    }

    function updateTask(todolistID: string, taskID: string, newTitle: string) {
        dispatchToTasks(changeTaskTitleAC(todolistID, taskID, newTitle))
    }

    function addTodolist(newTitle: string) {
        let action = addTodolistAC(newTitle)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function updateTodolistTitle(todolistID: string, newTitle: string) {
        dispatchToTodolist(changeTodolistTitleAC(todolistID, newTitle))
    }

    function changeStatus(todolistID: string, taskID: string, taskIsDone: boolean) {
        dispatchToTasks(changeTaskStatusAC(todolistID, taskID, taskIsDone))
    }

    function removeTodolist(todolistID: string) {
        dispatchToTodolist(removeTodolistAC(todolistID))
        dispatchToTasks(removeTodolistAC(todolistID))
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
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
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

export default AppWithReducers;
