import React, {useCallback, useEffect} from 'react';
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer';
import {
    AddItemForm,
    AddItemFormSubmitHelperType
} from '../../../components/AddItemForm/AddItemForm';
import {Button, IconButton, Paper} from '@mui/material';
import {Task} from './Task/Task';
import {tasksActions, todolistsActions} from '../index';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {useActions, useAppDispatch} from '../../../utils/redux-utils';
import {TaskStatuses, TaskType} from '../../../api/types';

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const {
        changeTodolistFilter,
        removeTodolistTC,
        changeTodolistTitleTC
    } = useActions(todolistsActions)
    const {fetchTasks} = useActions(tasksActions)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        if (!props.tasks.length) {
            fetchTasks(props.todolist.id)
        }
    }, [])

    const changeFilterHandler = useCallback((value: FilterValuesType) => {
        changeTodolistFilter({id: props.todolist.id, filter: value})
    }, [props.todolist.id])

    const removeTodolistHandler = () => {
        removeTodolistTC(props.todolist.id)
    }

    const addTaskCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = tasksActions.addTask({todolistId: props.todolist.id, title: title})
        const resultAction = await dispatch(thunk)

        if (tasksActions.addTask.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0];
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occured')
            }
        } else {
            helper.setTitle('')
        }
    }, [props.todolist.id])


    const changeTodolistTitle = useCallback((newTitle: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title: newTitle})
    }, [props.todolist.id])

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }

    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const renderFilterButton = (buttonFilter: FilterValuesType,
                                color: 'info' | 'secondary' | 'error',
                                text: string,
    ) => {
        return <Button
            variant={props.todolist.filter === buttonFilter ? 'outlined' : 'contained'}
            onClick={() => changeFilterHandler(buttonFilter)}
            color={color}>{text}</Button>
    }

    return (
        <Paper style={{padding: '10px', position: 'relative'}}>
            <IconButton size={'small'} onClick={removeTodolistHandler}
                        disabled={props.todolist.entityStatus === 'loading'}
                        style={{position: 'absolute', right: '5px', top: '5px'}}>
                <Delete fontSize={'small'}/>
            </IconButton>
            <h3>
                <EditableSpan title={props.todolist.title} callback={changeTodolistTitle}
                              disabled={props.todolist.entityStatus === 'loading'}/>
            </h3>

            <AddItemForm callback={addTaskCallback}
                         disabled={props.todolist.entityStatus === 'loading'}/>

            <div>
                {tasksForTodolist.map(t =>
                    <Task key={t.id}
                          task={t}
                          todolistId={props.todolist.id}
                    />
                )}
                {!tasksForTodolist.length &&
                    <div style={{padding: '10px', color: 'grey'}}>No tasks</div>}
            </div>
            <div style={{paddingTop: '10px'}}>
                {renderFilterButton('all', 'info', 'All')}
                {renderFilterButton('active', 'secondary', 'Active')}
                {renderFilterButton('completed', 'error', 'Completed')}
            </div>
        </Paper>
    )
});

