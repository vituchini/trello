import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Header} from './Header';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Header',
    component: Header,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        title: 'What to learn',
        callback: action('Remove button clicked'),
        changeTitle: action('Title changed'),
        todolist: {
            id: 'todolistId1',
            addedDate: '',
            order: 0,
            title: '',
            filter: 'all',
            entityStatus: 'idle',
        }
    },
} as ComponentMeta<typeof Header>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const HeaderStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HeaderStory.args = {};

