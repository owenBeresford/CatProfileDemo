import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Athlete } from '../types/Athlete';
import { Transport, AxiosResponse }from '../types/Transport';
import { useTransport } from '../services/Transport';
import {renderDate, getDefaultSelfie, defaultAthlete } from '../services/util';
import './ListAthletes.css';


export interface ShowAthleteProps {
    current:Athlete|null;
}

const ShowAthlete: React.FC<ShowAthleteProps> = ( props:ShowAthleteProps)=> {
     // short name isn't great, but confusing a type and variable is worse
    const { ID } = useParams(); 
    const [ ath, setAthlete]=useState<Athlete>( defaultAthlete( props.current) );
    const API:Transport<Athlete, string> =useTransport( );

    useEffect(() => {
       if(!ath.about) {
           if(! ID) { 
                setAthlete(defaultAthlete(null)); 
                throw new Error("Cannot load screen, no athlete ID and no athlete param");

            } else { 
                API.get(ID, undefined).then((dd)=>{ 
                    let dd2:AxiosResponse<Athlete>=dd as AxiosResponse<Athlete>;  
                    setAthlete(dd2.data ); 
                 } );
             }
        }
    }, [ath, setAthlete, API, ID] );

    const age:string=((new Date()).getUTCFullYear()- ath.dob.getUTCFullYear())+" years old";
    return (
    <div className="athlete popup">
        <dl>
            <dt>Athlete name </dt>
            <dd> 
               {ath.image===null? (<img src={ getDefaultSelfie() } width="100" height="150" alt="Fake image" />)
                                : (<img src={ath.image} width="100" height="150" alt="The sporting professionals face" />)}
               <p> { ath.name} </p></dd>
            <dt>Expressed Gender </dt>
            <dd>{ ath.gender }</dd>
            <dt>Date of birth </dt>
            <dd><time dateTime={ ath.dob.toString() }>{ renderDate(ath.dob) }/ { age }</time></dd>
            <dt>About me </dt>
            <dd>{ ath.about}</dd>        
            <dt>Team </dt>
            <dd>{ ath.team } [this text is a sports flag]</dd>
            <dt>Sports </dt>
            <dd> <ul>   
             {ath.sports.map((val, i) => {
                return (<li key={i} title={"A "+val+" sport "}> { val}</li>);
            })} </ul> </dd>
            <dt>Other interests </dt>
            <dd>{ ath.interests}</dd>
        </dl>
    </div>
  );
}

export default ShowAthlete;
