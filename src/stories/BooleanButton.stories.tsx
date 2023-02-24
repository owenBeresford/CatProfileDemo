
import React from 'react';
import BooleanButton  from '../client/components/BooleanButton';
import { actions, action } from '@storybook/addon-actions';
import { KnownSports } from "../client/types/KnownSports";
//SOURCE: https://github.com/percy/example-storybook-for-react/
// https://stackoverflow.com/questions/55428337/storybook-actions-what-exactly-are-they-calling
// https://storybook.js.org/docs/react/api/argtypes

// mock/ stubb
function f1(item: string): boolean {
//  action('clicked');
  return false;
}

// https://storybook.js.org/docs/react/essentials/actions
const argTypes= {	
	text:{ type: { name: 'KnownSports', required: true }, },
    push: { type: { name: '(a:string) => boolean', required: true }, }, 
	active:{ type: { name: 'boolean', required: true },  },
	trigger: {
      action: 'click',
    },
};
 
type localArgTypes= {  	
	text: KnownSports, 
	push: (a:string) => boolean, 
	active: boolean,
};  
// const TEMPLATE = (parameters:localArgTypes) => { return (<BooleanButton text={parameters.text} push={parameters.push} active={parameters.active}  />) };


export default {
  title: 'BooleanButton',
  component: BooleanButton,
  argTypes,
//  parameters:{
//		actions:{ 
//		 handles: ['trigger', '#togFencing'],
//				 }
//	}

};

export const OFF = () => { return (<BooleanButton text={"Snow Boarding" as KnownSports} push={f1} active={false} />) };
export const ON  = () => { return (<BooleanButton text={"Fencing" as KnownSports} push={f1} active={true } />) }; 


