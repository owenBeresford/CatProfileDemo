import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Athlete } from '../types/Athlete';
import { Transport, AxiosResponse }from '../types/Transport';
import { UseTransport } from '../services/Transport';
import {renderDate, getDefaultSelfie, defaultAthlete } from '../services/util';
import './ListAthletes.css';


export interface ShowAthleteProps {
    current:Athlete|null;
}

const ShowAthlete: React.FC<ShowAthleteProps> = ( props:ShowAthleteProps)=> {
     // short name isn't great, but confusing a type and variable is worse
    const { ID } = useParams(); 
    const [ ath, setAthlete]=useState<Athlete>( defaultAthlete( props.current) );
    const API:Transport<Athlete, string> =UseTransport( );

    useEffect(() => {
       if(!ath.about) {
           if(! ID) { 
                setAthlete(defaultAthlete(null)); 
                throw new Error("Cannot load screen, no athlete ID and no athlete param");

            } else { 
                API.get(ID, undefined).then((dd)=>{ 
                    const localList:AxiosResponse<Athlete>=dd as AxiosResponse<Athlete>;  
                    setAthlete(localList.data ); 
                 } );
             }
        }
    }, [ath, setAthlete, API, ID] );

    const age:string=((new Date()).getUTCFullYear()- ath.dob.getUTCFullYear())+" years old";
    return (
    <div className="athlete popup">
        <dl>
            <dt>Athlete name 
				<NavLink to="/"><span className="goBack">❌</span></NavLink>
			</dt>
            <dd> 
               {ath.image===null? (<img src={ getDefaultSelfie() } width="100" height="150" alt="Fake face" />)
                                : (<img src={ath.image} width="100" height="150" alt="The sporting professionals face" />)}
               <p className="inset"> { ath.name} </p></dd>
            <dt>Expressed Gender </dt>
            <dd>{ ath.gender }</dd>
            <dt>Date of birth </dt>
            <dd><time dateTime={ ath.dob.toString() }>{ renderDate(ath.dob) }/ { age }</time></dd>
            <dt>About me </dt>
            <dd>{ ath.about}</dd>        
            <dt>Team </dt>
            <dd>{ ath.team } [this text is a sports flag]</dd>
            <dt>Sports </dt>
            <dd> <ul className="ticks">   
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
