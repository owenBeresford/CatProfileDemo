
import React from 'react';
import ListCats  from '../client/components/ListCats';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { actions, action } from '@storybook/addon-actions';

const argTypes= {
};
 
export default {
    title: 'ListCats',
    component: ListCats,
    argTypes,
}

export const STEP0 = () => { return ( <BrowserRouter><ListCats   /></BrowserRouter> ) };
