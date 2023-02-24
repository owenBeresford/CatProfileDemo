
import React from 'react';
import ListCats  from '../client/components/ListCats';
import { actions, action } from '@storybook/addon-actions';

const argTypes= {
};
 
export default {
    title: 'ListCats',
    component: ListCats,
    argTypes,
}

export const STEP0 = () => { return (<ListCats   />) };
