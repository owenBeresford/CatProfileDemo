
import React from 'react';
import CatScreen2  from '../client/components/CatScreen2';
import { actions, action } from '@storybook/addon-actions';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChangeTab } from "../client/types/ChangeTab";
import { Cat  } from '../client/types/Cat';

const changeTab:ChangeTab=(i:number):void => { return; };
 
const argTypes= {	
	build:{ type: { name: 'Cat', required: true }, },
    incTab: { type:{ name: 'ChangeTab', required: true  } },
};

export default {
    title: 'CatScreen2',
    component: CatScreen2,
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

export const STEP0 = () => { return ( <BrowserRouter><CatScreen2 build={smolCat} incTab={changeTab} /></BrowserRouter> ) };

