import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Athlete } from '../types/Athlete';
import {Transport }from '../types/Transport';
import { Transport as ObjTransport, useTransport } from '../services/Transport';
import './ListAthletes.css';

function ListAthletes() {
    const [currentAthletes, setAthletes]=useState<Array<Athlete>>([] as Array<Athlete>);
    const API:Transport<Array<Athlete>> =useTransport( );

    useEffect(() => {
      if(currentAthletes.length===0) {
        setAthletes(API.get());
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
                <NavLink to={"/profile/"+i} >(ath.name)</NavLink>
            </li>);
            })}  
        </ul>
    </div>
  );
}

export default ListAthletes;
