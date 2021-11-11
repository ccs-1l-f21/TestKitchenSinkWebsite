
import React from 'react';
import diningCommonsFixtures from "fixtures/diningCommons";
import DiningCommons from "main/components/DiningCommons/DiningCommons";

export default {
    title: 'components/DiningCommons/DiningCommons',
    component: DiningCommons
};


const Template = (args) => {
    return (
        <DiningCommons {...args} />
    )
};

export const carrillo = Template.bind({});
carrillo.args = {diningCommons : diningCommonsFixtures[0]};

export const ortega = Template.bind({});
ortega.args = {diningCommons : diningCommonsFixtures[1]};


