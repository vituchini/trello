import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Todolist} from './Todolist';
import {TaskPriorities, TaskStatuses} from '../../../api/todolist-api';
import {ReduxStoreProviderDecorator} from '../../../stories/decorators/ReduxStoreProviderDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Todolist',
    component: Todolist,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        todolist: {
            id: 'todolistID1',
            addedDate: '',
            order: 0,
            title: 'What to learn',
            filter: 'all',
            entityStatus: 'idle',
        },
        tasks: [
            {
                id: '1',
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle',
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle',
            },
            {
                id: '4',
                title: 'Rest API',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle',
            },
            {
                id: '5',
                title: 'GraphQL',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: 'idle',
            },
        ],
        changeFilter: action('Filter button inside Todolist clicked'),
        addTask: action('Add new task button inside Todolist clicked'),
        removeTodolist: action('Remove button inside Todolist clicked'),
        updateTodolist: action('Title changed inside Todolist'),
        changeStatus: action('Status changed inside Task'),
        updateTask: action('Title changed inside Task'),
        removeTask: action('Remove button inside Task clicked'),
    },
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Todolist>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args}/>;

export const TodolistStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TodolistStory.args = {
    demo: true
};


