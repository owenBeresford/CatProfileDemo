
import React from 'react';
import CatScreen1  from '../client/components/CatScreen1';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { actions, action } from '@storybook/addon-actions';
import { ChangeTab } from "../client/types/ChangeTab";
import { Cat, storeACat } from '../client/types/Cat';

const changeTab:ChangeTab=(i:number):void => { return; };
const store:storeACat=(i:Cat):void => { return; };

const argTypes= {	
	build:{ type: { name: 'Cat', required: true }, },
    returnCat: { type: { name: 'storeACat', required: true }, }, 
    incTab: { type:{ name: 'ChangeTab', required: true  } },
};

export default {
    title: 'CatScreen1',
    component: CatScreen1,
    argTypes,
  
};

const smolCat:Cat= {
    name: "a a",
    dob: new Date(),
    team: "a",
    gender: "m",
    sports: ["American Football"],
    about: "a a",
    interests: "a a",
    image: null,
} as Cat;  

export const STEP0 = () => { return ( <BrowserRouter><CatScreen1 build={smolCat} returnCat={store} incTab={changeTab} /></BrowserRouter> ) };

