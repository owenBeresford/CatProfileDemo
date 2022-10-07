import React from "react";
import { Toggle } from  "react-toggle-component";
import { KnownSports } from '../types/KnownSports';
import './SignupCats.css';

export interface ButtonProps {
    text:KnownSports;
    push:(e:KnownSports)=> boolean;
	active:boolean;
}

// NB: push is a CB, not a call to Array.push
const BooleanButton: React.FC<ButtonProps> = ( props:ButtonProps)=> {

	const nom=props.text.replace(/ /g, "_");
	return (<label id={"lbl"+nom} className="buttons" htmlFor={"tog"+nom}>
  <Toggle key={"tag"+nom+(props.active?"T":"F")} name={"tog"+nom} onToggle={( ) => { props.push(props.text ); }} checked={ props.active} />
  {props.text}
</label>);
}

export default BooleanButton;
