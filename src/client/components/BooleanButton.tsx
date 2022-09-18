import React from "react";
import { Toggle } from  "react-toggle-component";
import { KnownSports } from '../types/KnownSports';
import './signupAthletes.css';

export interface ButtonProps {
    text:KnownSports;
    push:(e:KnownSports)=> boolean;
	active:boolean;
}

const BooleanButton: React.FC<ButtonProps> = ( props:ButtonProps)=> {
   return (<label id={"lbl"+props.text} className="buttons" htmlFor={"tog"+props.text}>
  <Toggle name={"tog"+props.text} onToggle={( ) => { props.push(props.text ); }} checked={ props.active} />
  {props.text}
</label>);
}

export default BooleanButton;
