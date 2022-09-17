import React, { useState } from "react";
import { Athlete } from '../types/Athlete';
import { ChangeTab }    from '../types/ChangeTab';
import './signupAthletes.css';
 

export interface Screen1Props {
    build:Athlete,
	returnAthlete:Function,
    incTab:ChangeTab
}

const AthleteScreen1: React.FC<Screen1Props> = ( props:Screen1Props)=> {
    const [ about, setAbout ]=useState<string>('');
    const [ interests, setInterests ]=useState<string>(''); 
    const [ team, setTeam ]=useState<string>(''); 
    const [errMsg, setErrmsg] = useState<string>('');

    function next(e:React.MouseEvent):boolean {
        if(!about || !interests || !team ) {
            setErrmsg("All athletes must enter their team, and something for about and interests");
            return false;
        }
   
        props.build.about=about;
        props.build.interests=interests;
        props.build.team=team;
        props.incTab(2);
		props.returnAthlete( props.build);
        return false;
    }

    return (
        <div className="aScreen popup">
            {errMsg.length>0?(<p className="error">{errMsg}</p>):(<></>) }
           <form >
                <label htmlFor="athAbout">Describe yourself: </label> 
                <textarea id="athAbout" name="athAbout" placeholder="Describe qualifications, ambitions etc"
                    cols={50} rows={5} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>):void =>{ setAbout(e.target.value); } } >
                </textarea>
                <label htmlFor="athInterests">Your interests: </label> 
                <textarea id="athInterests" name="athInterests" placeholder="Describe yourself" 
                    cols={50} rows={5} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>):void =>{ setInterests(e.target.value); } }>
                </textarea>
                <label htmlFor="athTeam">Your team: </label>
                <input id="athTeam" name="athTeam" value="" placeholder="Real Madrid" 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>):void =>{ setTeam(e.target.value); } } />

                <div className="buttonBar">
                    <input id="sendP2" type="button" value="Next to Review" onClick={next} />
                </div>   
            </form>
        </div>
  );
}

export default AthleteScreen1;

