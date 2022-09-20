import React, { useState, ReactElement } from "react";
import { Cat }      from '../types/Cat';
import { ChangeTab }    from '../types/ChangeTab';
import { defaultCat } from '../services/util';
import CatScreen0 from './CatScreen0';
import CatScreen1 from './CatScreen1';
import CatScreen2 from './CatScreen2';

import './SignupCats.css';

function SignupCat() {
    // short name isn't great, but confusing a type and variable is worse
	 /* eslint-disable @typescript-eslint/no-unused-vars */ 
    const [ signupScreen, setSignupScreen]=useState<number>( 0 );
    const [ buildAth, setBuildingCat ]=useState<Cat>( defaultCat(null) );

    return (<div className="signupContainer ">
			<>
            <p className="error">To comply with GDPR, please enter fake data.</p>    
            { spread(signupScreen, buildAth, setBuildingCat,  setSignupScreen ) }
			</>
        </div> );
}

function spread(signupScreen:number, buildAth:Cat, setBuildingCat:(a:Cat)=>void,  push:ChangeTab ):ReactElement {
    switch(signupScreen) {
        case 0: return (<CatScreen0 build={buildAth} incTab={push} returnCat={ setBuildingCat} />); 
        case 1: return (<CatScreen1 build={buildAth} incTab={push} returnCat={ setBuildingCat} />); 
        case 2: return (<CatScreen2 build={buildAth} incTab={push}  />); 
        default: throw new Error("Unknown value for the signup screen");
    }
} 

export default SignupCat;
