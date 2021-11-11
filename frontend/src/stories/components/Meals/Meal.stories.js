
import React from 'react';
import mealsFixtures from "fixtures/meals";
import Meal from "main/components/Meals/Meal";

export default {
    title: 'components/Meals/Meal',
    component: Meal
};


const Template = (args) => {
    return (
        <Meal {...args} />
    )
};

export const brunch = Template.bind({});
brunch.args = {meal : mealsFixtures[0]};

export const dinner = Template.bind({});
dinner.args = {meal : mealsFixtures[1]};


