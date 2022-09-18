import React from "react";
import { useNavigate } from 'react-router';
import ShowAthlete from './ShowAthlete';
import { Athlete, ShippingAthlete } from '../types/Athlete';
import { UseTransport } from '../services/Transport';
import { Transport } from '../types/Transport';
import { ChangeTab } from '../types/ChangeTab';
import './signupAthletes.css';
 
export interface Screen2Props {
    build:Athlete,
	returnAthlete:Function,
    incTab:ChangeTab,
 }

const AthleteScreen2: React.FC<Screen2Props> = ( props:Screen2Props)=> {    
	const NAVIGATE=useNavigate();

    function back(e:React.MouseEvent):boolean {
        props.incTab(0);
        return false;
    }

    function next(e:React.MouseEvent):boolean {
        const API:Transport<ShippingAthlete, string> =UseTransport( );
		let tt:ShippingAthlete={...props.build, dob:props.build.dob.getTime()} as ShippingAthlete;
        API.post( JSON.stringify(tt), undefined);

        window.history.pushState({}, "", '/list' );
        NAVIGATE( '/list' );
        return false;
    }

    return (
        <div className="aScreen popup">
            <ShowAthlete current={props.build }/> 

            <div className="buttonBar">
                <input id="sendP3back" type="button" value="Edit my profile" onClick={back} />

                <input id="sendP3" type="button" value="Save my profile" onClick={next} />
            </div>  
        </div>
  );
}

export default AthleteScreen2;
