import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Athlete } from '../types/Athlete';
import { Transport, AxiosResponse } from '../types/Transport';
import { UseTransport } from '../services/Transport';
import './ListAthletes.css';

function ListAthletes() {
    const [currentAthletes, setAthletes]=useState<Array<Athlete>>([] as Array<Athlete>);
    const API:Transport<Array<Athlete>, string> =UseTransport( ) as Transport<Array<Athlete>, string> ;

    useEffect(() => {
      if(currentAthletes.length===0) {
        API.getAll(undefined).then((dd)=>{ 
            const importList:AxiosResponse<Array<Athlete>>=dd as AxiosResponse<Array<Athlete>>; 
             setAthletes(importList.data ); 
             } )
    
      }
   }, [currentAthletes, setAthletes, API] );

  return (
    <div className="athletes">
        <ul>
         <li key="new" title={"Signup and create a new profile"}> 
            <NavLink to="/signup/" > Signup</NavLink>
        </li>   
        {currentAthletes.map((ath, i) => {
            return (<li key={i} title={"Display "+ath.name+"'s profile "}>
                <NavLink to={"/profile/"+i} >{ath.name}</NavLink>
            </li>);
            })}  
        </ul>
    </div>
  );
}

export default ListAthletes;
