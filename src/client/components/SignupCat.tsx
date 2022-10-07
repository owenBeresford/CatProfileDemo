import React, { useState, ReactElement, useEffect  } from "react";
import { useParams } from 'react-router-dom';
import { Cat }      from '../types/Cat';
import { ChangeTab } from '../types/ChangeTab';
import { defaultCat } from '../services/util';
import { Transport, AxiosResponse }from '../types/Transport';
import { UseTransport } from '../services/Transport';
import CatScreen0 from './CatScreen0';
import CatScreen1 from './CatScreen1';
import CatScreen2 from './CatScreen2';

import './SignupCats.css';

function SignupCat() {
    let { ID } = useParams(); 
    // short name isn't great, but confusing a type and variable is worse
	 /* eslint-disable @typescript-eslint/no-unused-vars */ 
    const [ signupScreen, setSignupScreen]=useState<number>( 0 );
    const [ buildCat, setBuildingCat ]=useState<Cat>( defaultCat(null) );
	const [ errMsg, setErrorMessage]=useState<string>("");
    const API:Transport<Cat, string> =UseTransport( );

// TEMP IOIO this is code to be replaced; 
// its terrible to exec an API twice as two components don't talk
	 useEffect(() => {
       if(!buildCat || !buildCat.about) {
           setErrorMessage("");

           if( ID) { 
                API.get(ID, undefined).then((dd)=>{ 
                    const localCat:AxiosResponse<Cat>=dd as AxiosResponse<Cat>;  
					setBuildingCat(localCat.data ); 
                 } ).catch((ee)=> { 
					console.warn("oh no; the API busted!!!", ee);
                	setErrorMessage("Cannot load screen, API failed");
					// this should force it to get called again
				    ID=ID;
				  } );
             }
        }
    }, [buildCat, setBuildingCat, API, ID] );



    return (<div className="signupContainer ">
			<>
			{ errMsg?(<p className="error">{ errMsg}</p>):(<></>) }
            <p className="error">To comply with GDPR, please enter fake data.</p>    
            { spread(signupScreen, buildCat, setBuildingCat,  setSignupScreen ) }
			</>
        </div> );
}

function spread(signupScreen:number, buildCat:Cat, setBuildingCat:(a:Cat)=>void,  push:ChangeTab ):ReactElement {
    switch(signupScreen) {
        case 0: return (<CatScreen0 build={buildCat} incTab={push} returnCat={ setBuildingCat} />); 
        case 1: return (<CatScreen1 build={buildCat} incTab={push} returnCat={ setBuildingCat} />); 
        case 2: return (<CatScreen2 build={buildCat} incTab={push}  />); 
        default: throw new Error("Unknown value for the signup screen");
    }
} 

export default SignupCat;
