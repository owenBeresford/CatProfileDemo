import React, { useState} from "react";
import { Athlete }      from '../types/Athlete';
import { ChangeTab }    from '../types/ChangeTab';
import { defaultAthlete } from '../services/util';
import AthleteScreen0 from './AthleteScreen0';
import AthleteScreen1 from './AthleteScreen1';
import AthleteScreen2 from './AthleteScreen2';

import './signupAthletes.css';

function SignupAthlete() {
    // short name isn't great, but confusing a type and variable is worse
    //   @typescript-eslint/no-unused-vars
    const [ signupScreen, setSignupScreen]=useState<number>( 0 );
    const [ buildAth, setBuildingAthlete ]=useState<Athlete>( defaultAthlete(null) );

    return (
        <div className="signupContainer ">
            <p>To comply with GDPR, please enter fake data.</p>    
            { spread(signupScreen, buildAth, setSignupScreen ) }
        </div>
    );
}

function spread(signupScreen:number, buildAth:Athlete, push:ChangeTab ):any {
    switch(signupScreen) {
        case 0: return (<AthleteScreen0 build={buildAth} incTab={push} />); 
        case 1: return (<AthleteScreen1 build={buildAth} incTab={push} />); 
        case 2: return (<AthleteScreen2 build={buildAth} incTab={push} />); 
        default: throw new Error("Unknown value for the signup screen");
    }
} 

export default SignupAthlete;
