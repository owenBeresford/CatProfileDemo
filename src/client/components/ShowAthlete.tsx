import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Athlete } from '../types/Athlete';
import { Transport }from '../types/Transport';
import { useTransport } from '../services/Transport';
import {renderDate, getDefaultSelfie, defaultAthlete } from '../services/util';
import './ListAthletes.css';

function ListAthletes() {
    // short name isn't great, but confusing a type and variable is worse
    const [ ath, setAthlete]=useState<Athlete>( defaultAthlete() );
    const API:Transport<Athlete> =useTransport( );

    useEffect(() => {
       setAthlete(API.get());

    }, [ setAthlete] );

    const age:string=((new Date()).getUTCFullYear()- ath.dob.getUTCFullYear())+" years old";
    return (
    <div className="athlete popup">
        <dl>
            <dt>Athlete name</dt>
            <dd> 
               {ath.image===null? (<img src={ getDefaultSelfie() } width="100" height="150" alt="Fake image" />)
                                : (<img src={ath.image} width="100" height="150" alt="The sporting professionals face" />)}
               <p> { ath.name} </p></dd>
            <dt>Expressed Gender</dt>
            <dd>{ ath.gender }</dd>
            <dt>Date of birth</dt>
            <dd><time dateTime={ ath.dob.toString() }>{ renderDate(ath.dob) }/ { age }</time></dd>
            <dt>About me</dt>
            <dd>{ ath.about}</dd>        
            <dt>Team</dt>
            <dd>{ ath.team } [this text is a sports flag]</dd>
            <dt>Sports</dt>
            <dd> <ul>   
             {ath.sports.map((val, i) => {
                return (<li key={i} title={"A "+val+" sport "}> { val}</li>);
            })} </ul> </dd>
            <dt>Other interests</dt>
            <dd>{ ath.interests}</dd>
        </dl>
    </div>
  );
}

export default ListAthletes;
