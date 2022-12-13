import React, {useReducer} from 'react';
import '../app/App.css';
import {v1} from 'uuid';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {Container, Grid, Paper} from '@mui/material';
import ButtonAppBar from '../components/AppBar';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from '../features/TodolistsList/todolists-reducer';
import {addTaskAC, removeTaskAC, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolist-api';

/*
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

let todolistID1 = v1();
let todolistID2 = v1();

function AppWithReducers() {

    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
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
                priority: TaskPriorities.Low
            },
        ]
    });

    function removeTask(todolistID: string, taskID: string) {
        dispatchToTasks(removeTaskAC(todolistID, taskID))
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatchToTodolist(changeTodolistFilterAC(todolistID, value))
    }

    function addTask(todolistId: string, title: string) {
        const action = addTaskAC({
            todoListId: todolistId,
            title: title,
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            id: 'id exists'
        })
        dispatchToTasks(action)
    }

    function updateTask(todolistID: string, taskID: string, newTitle: string) {
        dispatchToTasks(changeTaskTitleAC(todolistID, taskID, newTitle))
    }

    function addTodolist(newTitle: string) {
        const action = addTodolistAC({
            id: v1(),
            title: newTitle,
            addedDate: '',
            order: 0
        })
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function updateTodolistTitle(todolistID: string, newTitle: string) {
        dispatchToTodolist(changeTodolistTitleAC(todolistID, newTitle))
    }

    function changeStatus(todolistID: string, taskID: string, status: TaskStatuses) {
        dispatchToTasks(changeTaskStatusAC(todolistID, taskID, status))
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
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
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

 */
