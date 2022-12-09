import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Todolist',
    component: Todolist,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        todolistID: 'todolistId1',
        title: 'What to learn',
        tasks: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        changeFilter: action('Filter button inside Todolist clicked'),
        addTask: action('Add new task button inside Todolist clicked'),
        removeTodolist: action('Remove button inside Todolist clicked'),
        updateTodolist: action('Title changed inside Todolist'),
        changeStatus: action('Status changed inside Task'),
        updateTask: action('Title changed inside Task'),
        removeTask: action('Remove button inside Task clicked'),
    },
} as ComponentMeta<typeof Todolist>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args} />;

export const TodolistStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TodolistStory.args = {};


