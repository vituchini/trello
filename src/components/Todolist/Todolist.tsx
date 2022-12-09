import React, {useCallback} from 'react';
import {Header} from '../Header/Header';
import {FilterValuesType} from '../../App';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {Button} from '@mui/material';
import {Task} from '../Task/Task';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TasksType>
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    updateTodolist: (todolistID: string, newTitle: string) => void
    changeStatus: (todolistID: string, taskID: string, taskIsDone: boolean) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    removeTask: (todolistID: string, taskID: string) => void

}
export const Todolist = React.memo((props: PropsType) => {

    const changeFilterHandler = useCallback((value: FilterValuesType) => {
        props.changeFilter(props.todolistID, value)
    }, [props.changeFilter, props.todolistID])

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const AddTaskHandler = useCallback((newTitle: string) => {
        return props.addTask(props.todolistID, newTitle)
    }, [props.addTask, props.todolistID])

    const updateTodolist = useCallback((newTitle: string) => {
        props.updateTodolist(props.todolistID, newTitle)
    }, [props.updateTodolist, props.todolistID])

    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }

    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <Header changeTitle={updateTodolist} name={'x'} callback={removeTodolistHandler}
                    title={props.title}
            />

            <AddItemForm callback={AddTaskHandler}/>

            <div>
                {tasksForTodolist.map(t =>
                    <Task key={t.id}
                          task={t}
                          changeStatus={props.changeStatus}
                          updateTask={props.updateTask}
                          removeTask={props.removeTask}
                          todolistID={props.todolistID}
                    />
                )}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterHandler('all')} color="info">All</Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterHandler('active')} color="secondary">Active</Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterHandler('completed')} color="error">Completed</Button>
            </div>
        </div>
    )
});

