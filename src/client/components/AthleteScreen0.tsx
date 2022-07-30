import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import { Athlete } from '../types/Athlete';
import  DateBlock from './DateBlock';
import { KnownSports, KnownSportsValues } from '../types/KnownSports';
import { ChangeTab }    from '../types/ChangeTab';
import BooleanButton from './BooleanButton';
import './signupAthletes.css';

export interface Screen0Props {
    build:Athlete,
    push:ChangeTab
}

const AthleteScreen0: React.FC<Screen0Props> = ( props:Screen0Props)=> {
    const [ sports, setSports ] = useState<Array<KnownSports>>([] as Array<KnownSports>);
    const [ dob, setDOB] = useState<number|undefined>(new Date( '2002-07-01' ).getTime());
    const [ name, setName ]=useState<string>('');
    const [ gender, setGender ]=useState<string>('');    
    const [errMsg, setErrmsg] = useState<string>('');


    function next(e:React.MouseEvent):boolean {
        if(!dob || !name || !gender || sports.length===0) {
            setErrmsg("All athletes must enter their name, gender, sports and date of birth");
            return false;
        }
   
        props.build.gender=gender;
        props.build.name=name;
        props.build.dob=new Date(dob);
        props.build.sports=[...sports];  
        props.push(1);
        return false;
    }
    
    function chooseSport(item:string):boolean {
        const WHICH:KnownSports = item as KnownSports;
        if( sports.includes( WHICH) ) {
            var index = sports.indexOf( WHICH );
            setSports( sports.splice(index, 1) );
        } else {    
            setSports( [...sports, WHICH as KnownSports ] );
        }
        return false;
    }

// IOIO pull out the date widget wrapper
    return (
    <div className="aScreen popup">
       <form >
            {errMsg.length>0?(<p className="error">{errMsg}</p>):(<></>) }
            <label htmlFor="athName"> Your name: </label> 
            <input id="athName" name="athName" value="" placeholder="Your name" 
                onChange={(e:React.ChangeEvent<HTMLInputElement>):void =>{ setName(e.target.value); } } />
            <label htmlFor="athGender">Gender: </label> 
            <input id="athGender" name="athGender" value="" placeholder="Describe yourself"
                onChange={(e:React.ChangeEvent<HTMLInputElement>):void =>{ setGender(e.target.value); } }  />
            <label htmlFor="athDob">Birth date: </label>
            <DateBlock passback={ setDOB} />
 
            <label htmlFor="athSports">Sports: </label> 
            <div>
               { KnownSportsValues.map((name, i)=> {
                   return (<BooleanButton text={name} push={chooseSport} />); 
               }) } 
            </div>    
 
            <div className="buttonBar">
                <input id="sendP1" type="button" value="Next " onClick={next} />
            </div>   
       </form>
    </div>
  );
}

export default AthleteScreen0;
