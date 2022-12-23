import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import App from './App';
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = () => <App />;

export const AppBaseExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppBaseExample.args = {
    demo: true
};

