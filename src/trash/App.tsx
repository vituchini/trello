import React, {useState} from 'react';
import '../app/App.css';
import {v1} from 'uuid';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {Container, Grid, Paper} from '@mui/material';
import ButtonAppBar from '../components/AppBar';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolist-api';
import {FilterValuesType, TodolistDomainType} from '../features/TodolistsList/todolists-reducer';
import {RequestStatusType} from '../app/app-reducer';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todoListId: todolistID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: todolistID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'React',
                status: TaskStatuses.New,
                todoListId: todolistID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Rest API',
                status: TaskStatuses.New,
                todoListId: todolistID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'GraphQL',
                status: TaskStatuses.New,
                todoListId: todolistID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
        ],
        [todolistID2]: [
            {
                id: v1(),
                title: 'Pork',
                status: TaskStatuses.Completed,
                todoListId: todolistID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Tomatoes',
                status: TaskStatuses.Completed,
                todoListId: todolistID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Сucumbers',
                status: TaskStatuses.New,
                todoListId: todolistID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Bread',
                status: TaskStatuses.New,
                todoListId: todolistID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Ketchup',
                status: TaskStatuses.New,
                todoListId: todolistID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
        ]
    });

    function removeTask(todolistID: string, taskID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(filtered => filtered.id === todolistID ? {...filtered, filter: value} : filtered))
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todolistID,
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            entityStatus: 'idle' as RequestStatusType
        };
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
        setTodolists([{
            id: newTodolistID,
            title: newTitle,
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        }, ...todolists])
        setTasks({...tasks, [newTodolistID]: []})
    }

    function updateTodolistTitle(todolistID: string, newTitle: string) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl))
    }

    function changeStatus(todolistID: string, taskID: string, status: TaskStatuses) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, status: status} : t)
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
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
                        }


                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolist={tl}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
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
