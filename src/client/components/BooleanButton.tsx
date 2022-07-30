import React, { useState, useEffect } from "react";
import ToggleButton from  "react-toggle-button";
import { KnownSports } from '../types/KnownSports';
import './SignupAthletes.css';

export interface ButtonProps {
    text:KnownSports;
    push:(e:KnownSports)=> boolean;
}

const BooleanButton: React.FC<ButtonProps> = ( props:ButtonProps)=> {
// may need to convert to a setState    
    let state:boolean=false;
  return (
    <span id={props.text} className="buttons">
        <ToggleButton
                inactiveLabel={" 🗙 " }
                activeLabel={" ✔ "}
                value={ state }
                onToggle={(value) => {
                    state=value; 
                    props.push(props.text);

                }} /> 
        {props.text}
    </span>
  );
}

export default BooleanButton;
