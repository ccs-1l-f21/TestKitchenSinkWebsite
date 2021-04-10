
import React from 'react';

import HomePage from "main/pages/HomePage/HomePage";

import ContextTemplate from "stories/storyutils/ContextTemplate"

export default {
    title: 'pages/HomePage/HomePage',
    component: HomePage
};

const HomePageInContext = ContextTemplate(HomePage);
const Template = () => <HomePageInContext />;

export const Default = Template.bind({});




