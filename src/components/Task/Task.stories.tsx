import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        todolistID: '1',
        changeStatus: action('Status changed inside Task'),
        updateTask: action('Title changed inside Task'),
        removeTask: action('Remove button inside Task clicked'),
    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    task: {id: '1', isDone: true, title: 'JS'},
};

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    task: {id: '1', isDone: false, title: 'JS'},
};

