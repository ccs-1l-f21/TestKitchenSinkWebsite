
import React from 'react';

import HomePage from "main/pages/HomePage";
import diningCommonsFixtures from 'fixtures/diningCommons';

export default {
    title: 'pages/HomePage/HomePage',
    component: HomePage
};

const Template = () => <HomePage diningCommonsList = {diningCommonsFixtures}/>;

export const Default = Template.bind({});




