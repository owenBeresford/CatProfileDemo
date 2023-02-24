
import React from 'react';
import SignupCat  from '../client/components/SignupCat';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { actions, action } from '@storybook/addon-actions';
import { ChangeTab } from "../client/types/ChangeTab";

const argTypes= {
};
export default {
    title: 'SignupCat',
    component: SignupCat,
    argTypes,
  //  parameters:{
  //		actions:{ 
  //		 handles: ['trigger', '#togFencing'],
  //				 }
  //	}
  
  };

  export const STEP0 = () => { return ( <BrowserRouter><SignupCat /> </BrowserRouter> ) };  
  