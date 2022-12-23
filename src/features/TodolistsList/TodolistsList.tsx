import React, {FC, useCallback, useEffect} from 'react';
import {Grid} from '@mui/material';
import {
    AddItemForm,
    AddItemFormSubmitHelperType
} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import {selectIsLoggedIn} from '../Auth/selectors';
import {todolistsActions} from './index';
import {useActions, useAppDispatch, useAppSelector} from '../../utils/redux-utils';

type PropsType = {
    demo?: boolean
}

export const TodolistsList: FC<PropsType> = ({demo = false}) => {
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()

    const {fetchTodolistsTC} = useActions(todolistsActions)

    const AddTodolistCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {

        let thunk = todolistsActions.addTodolistTC(title)
        const resultAction = await dispatch(thunk)

        if (todolistsActions.addTodolistTC.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0];
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occured')
            }
        } else {
            helper.setTitle('')
        }

    }, [])

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        if (!todolists.length) {
            fetchTodolistsTC()
        }
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm callback={AddTodolistCallback}/>
            </Grid>
            <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
                {todolists.map((tl) => {

                    return (
                        <Grid item key={tl.id}>
                            <div style={{width: '300px'}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={tasks[tl.id]}
                                    demo={demo}
                                />
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        </>)
}