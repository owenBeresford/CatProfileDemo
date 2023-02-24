
import React from 'react';
import DateBlock  from '../client/components/DateBlock';
import { actions, action } from '@storybook/addon-actions';
import { ChangeTab } from '../client/types/ChangeTab';

const argTypes= {	
	passback:{ type: { name: 'ChangeTab', required: true }, },
    initialVal: { type: { name: 'number', required: true }, }, 
 
}; 

const changeTab:ChangeTab=(i:number):void => { return; };

export default {
    title: 'DateBlock',
    component: DateBlock,
    argTypes,
  //  parameters:{
  //		actions:{ 
  //		 handles: ['trigger', '#togFencing'],
  //				 }
  //	}
  };

  export const STEP0 = () => { return (<DateBlock passback={changeTab} initialVal={0}  />) };
  export const STEP1 = () => { return (<DateBlock passback={changeTab} initialVal={1}  />) };
  export const STEP2 = () => { return (<DateBlock passback={changeTab} initialVal={NaN}  />) };
  export const STEP3 = () => { return (<DateBlock passback={alert} initialVal={2}  />) };
