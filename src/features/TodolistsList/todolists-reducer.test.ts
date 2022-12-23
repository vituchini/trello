import {
    addTodolistTC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from '../../api/todolist-api';
import {RequestStatusType} from '../../app/app-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {

    const payload = {id: todolistId1};
    const endState = todolistsReducer(startState, removeTodolistTC.fulfilled(payload, 'requestId', payload.id))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolist: TodolistType = {
        id: 'any id',
        title: 'New Todolist',
        order: 0,
        addedDate: ''
    };

    const endState = todolistsReducer(startState, addTodolistTC.fulfilled({todolist}, 'requestId', todolist.title))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const payload = {id: todolistId2, title: newTodolistTitle};
    const endState = todolistsReducer(startState, changeTodolistTitleTC.fulfilled(payload, 'requestId', payload));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';

    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {
    const payload = {todolists: startState};
    let action = fetchTodolistsTC.fulfilled(payload, 'requestId')

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading';

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC({id: todolistId2, status: newStatus}));

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});


