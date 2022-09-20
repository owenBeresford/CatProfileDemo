import React, { useState } from "react";
import DateBlock from './DateBlock';
import BooleanButton from './BooleanButton';
import { NavLink } from 'react-router-dom';

import { ChangeTab }    from '../types/ChangeTab';
import { Cat } from '../types/Cat';
import { KnownSports, KnownSportsValues } from '../types/KnownSports';
import { mapInitialValue, includesWithBetterTyping  } from '../services/util';
import './SignupCats.css';

export interface Screen0Props {
    build:Cat,
	returnCat:(a:Cat)=>void,
    incTab:ChangeTab
}

const CatScreen0: React.FC<Screen0Props> = ( props:Screen0Props)=> {
    const [ sports, setSports ] = useState<Array<KnownSports>>( mapInitialValue<Array<KnownSports>>(props.build, props.build.sports, [] as Array<KnownSports>));
    const [ dob, setDOB] = useState<number|undefined>( mapInitialValue<number>(props.build,  props.build.dob.getTime(), (new Date( '2002-07-01' ).getTime())));
    const [ name, setName ]=useState<string>( mapInitialValue<string>(props.build, props.build.name, ''));
    const [ gender, setGender ]=useState<string>( mapInitialValue<string>(props.build, props.build.gender, ''));    
    const [ errMsg, setErrmsg] = useState<string>('');
console.log("Building a screen0", props.build, name, gender, dob, sports);

    function next():boolean {
        if(!dob || !name || !gender || sports.length===0) {
            setErrmsg("All cats must enter their name, gender, sports and date of birth");
            return false;
        }
   
        props.build.gender=gender;
        props.build.name=name;
        props.build.dob=new Date(dob);
        props.build.sports=[...sports];  
        props.incTab(1);
		props.returnCat( props.build);
        return false;
    }
    
    function chooseSport(item:string):boolean {
        const WHICH:KnownSports = item as KnownSports;
        if( sports.includes( WHICH) ) {
// to remove a sport
            const index = sports.indexOf( WHICH );
            setSports( sports.splice(index, 1) );
        } else {    
            setSports( [...sports, WHICH as KnownSports ] );
        }
        return false;
    }
	const DEFAULT_DOB=(new Date('2002-09-01')).getTime();
    const CURRENT_SPORTS=mapInitialValue<Array<KnownSports>>(props.build, props.build.sports, []);
	const BITS	=KnownSportsValues.map((name:KnownSports)=> {
					 /* eslint-disable react/jsx-no-bind */ 
                   return (<BooleanButton text={name} push={chooseSport} active={ includesWithBetterTyping( CURRENT_SPORTS, name ) } /> );
               }) 

// IOIO pull out the date widget wrapper
    return (
    <div className="aScreen popup">
       <form >
            {errMsg.length>0?(<p className="error">{errMsg}</p>):(<></>) }
            <label htmlFor="athName"> Your name: </label> 
            <input id="athName" name="athName" value={name} placeholder="Your name" 
                onChange={(e:React.ChangeEvent<HTMLInputElement>):void =>{ setName(e.target.value); } } />
            <label htmlFor="athGender">Gender: </label> 
            <input id="athGender" name="athGender" value={gender} placeholder="Describe yourself"
                onChange={(e:React.ChangeEvent<HTMLInputElement>):void =>{ setGender(e.target.value); } }  />
            <label htmlFor="athDob">Birth date: </label>
            <DateBlock passback={ setDOB} initialVal={ dob || DEFAULT_DOB} />
 
            <label htmlFor="athSports">Sports: </label> 
            <div className="appCols">
               { BITS } 
            </div>    
 
            <div className="buttonBar">	
				<NavLink to="/"><span className="goBack button">❌ Cancel</span></NavLink>
                <input className="button" id="sendP1" type="button" value="Next " onClick={next} />
            </div>   
       </form>
    </div>
  );
}

export default CatScreen0;
