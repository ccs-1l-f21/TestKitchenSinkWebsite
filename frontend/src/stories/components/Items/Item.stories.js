import React from 'react';
import itemsFixtures from "fixtures/items"
import Item from "main/components/Items/Item";

export default {
    title: 'components/Items/Item',
    component: Item
};


const Template = (args) => {
    return (
        <Item {...args} />
    )
};

export const salami = Template.bind({});
salami.args = {item : itemsFixtures[0]};

export const pastrami = Template.bind({});
pastrami.args = {item : itemsFixtures[1]};


