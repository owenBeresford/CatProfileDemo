import React  from "react";
import { Athlete } from '../types/Athlete';
import ShowAthlete from './ShowAthlete';

import { UseTransport } from '../services/Transport';
import { Transport } from '../types/Transport';
import { ChangeTab } from '../types/ChangeTab';
import './signupAthletes.css';
 
export interface Screen2Props {
    build:Athlete,
    incTab:ChangeTab,
 }

const AthleteScreen2: React.FC<Screen2Props> = ( props:Screen2Props)=> {    

    function back(e:React.MouseEvent):boolean {
        props.incTab(0);
        return false;
    }

    function next(e:React.MouseEvent):boolean {
        const API:Transport<Athlete, string> =UseTransport( );
        API.post( JSON.stringify(props.build), undefined);

        window.history.pushState({}, "", '/list' );
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
