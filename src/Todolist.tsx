import React from 'react';
import {Header} from './components/Header';
import {FilterValuesType} from './App';
import {Button} from './components/Button';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './EditableSpan';

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TasksType>
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeStatus: (todolistID: string, taskID: string, taskIsDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    updateTodolist: (todolistID: string, newTitle: string)=>void
}
export const Todolist = (props: PropsType) => {

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todolistID, value)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const AddTaskHandler = (newTitle: string) => {
        return props.addTask(props.todolistID, newTitle)
    }

    const updateTaskHandler = (taskID: string, newTitle: string) => {
        props.updateTask(props.todolistID, taskID, newTitle)
    }

    const updateTodolist = (newTitle: string) => {
        props.updateTodolist(props.todolistID, newTitle)
    }

    return (
        <div>
            <Header changeTitle={updateTodolist} name={'x'} callback={removeTodolistHandler}
                    title={props.title}
            />

            <AddItemForm callback={AddTaskHandler}/>

            <ul>
                {props.tasks.map(t => {
                        const removeTaskHandler = (tId: string) => {
                            props.removeTask(props.todolistID, tId)
                        }
                        return (
                            <li key={t.id}
                                className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={(e) => {
                                           props.changeStatus(props.todolistID, t.id, e.currentTarget.checked)
                                       }}
                                />
                                <EditableSpan title={t.title}
                                              callback={(newTitle: string) => updateTaskHandler(t.id, newTitle)}/>
                                <Button name={'x'} callback={() => removeTaskHandler(t.id)}/>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <Button className={props.filter === 'all' ? 'btn-active' : ''} name={'All'}
                        callback={() => changeFilterHandler('all')}/>
                <Button className={props.filter === 'active' ? 'btn-active' : ''} name={'Active'}
                        callback={() => changeFilterHandler('active')}/>
                <Button className={props.filter === 'completed' ? 'btn-active' : ''} name={'Completed'}
                        callback={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    )
        ;
};