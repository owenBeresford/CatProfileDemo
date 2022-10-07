import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Cat } from '../types/Cat';
import { Transport, AxiosResponse }from '../types/Transport';
import { UseTransport } from '../services/Transport';
import {renderDate, getDefaultSelfie, defaultCat, getFlag } from '../services/util';
import './ListCats.css';


export interface ShowCatProps {
    current:Cat|null;
	isChild:boolean;
}

const ShowCat: React.FC<ShowCatProps> = ( props:ShowCatProps)=> {
     // short name isn't great, but confusing a type and variable is worse
    let { ID } = useParams(); 
    const [ cat, setCat]=useState<Cat>( defaultCat( props.current) );
	const [ errMsg, setErrorMessage]=useState<string>("");
    const API:Transport<Cat, string> =UseTransport( );

    useEffect(() => {
       if(!cat || !cat.about) {
           setErrorMessage("");

           if(! ID) { 
                setCat(defaultCat(null)); 
                setErrorMessage("Cannot load screen, no cat ID and no cat param");

            } else { 
                API.get(ID, undefined).then((dd)=>{ 
                    const localCat:AxiosResponse<Cat>=dd as AxiosResponse<Cat>;  
                    setCat(localCat.data ); 
                 } ).catch((ee)=> { 
					console.warn("oh no; the API busted!!!", ee);
                	setErrorMessage("Cannot load screen, API failed");
					// this should force it to get called again
				    ID=ID;
				  } );
             }
        }
    }, [cat, setCat, API, ID] );

// can also use &#9998; as an edit symbol
// benefits from  .edit-icon { display: inline-block; transform: rotateZ(90deg); font-size:200%; }
	if(!cat || !cat.dob) {
		return (<div className="error popup">Data loading.. {errMsg}</div>);
	}
	const flag= getFlag(cat.team);
    const age:string=( (new Date()).getUTCFullYear()- cat.dob.getUTCFullYear() )+" years old";
    return (
    <div className="cat popup">
        <dl>{
			errMsg?(<><dt></dt><dd className="error">{ errMsg}</dd></>):(<></>)
            }<dt>Cat name 
				{ props.isChild?(<></>):( <span className="goBack"><NavLink to={"/signup/"+ID}>✍ </NavLink></span>) }
				<span className="goBack"><NavLink to="/">❌</NavLink></span>
			</dt>
            <dd> 
               {cat.image===null? (<img src={ getDefaultSelfie() } width="100" height="150" alt="Fake face until there is funding." />)
                                : (<img src={cat.image} width="100" height="150" alt="The professional sporting-cats face" />)}
               <p className="inset"> { cat.name} </p></dd>
            <dt>Expressed Gender </dt>
            <dd>{ cat.gender }</dd>
            <dt>Date of birth </dt>
            <dd><time dateTime={ cat.dob.toString() }>{ renderDate(cat.dob) }/ { age }</time></dd>
            <dt>About me </dt>
            <dd>{ cat.about}</dd>        
            <dt>Team </dt>
            <dd className="superLarge">{ cat.team } <span>{ flag}</span></dd>
            <dt>Sports </dt>
            <dd> <ul className="ticks">   
             {cat.sports.map((val, i) => {
                return (<li key={i} title={"A "+val+" sport "}> { val}</li>);
            })} </ul> </dd>
            <dt>Other interests </dt>
            <dd>{ cat.interests}</dd>
        </dl>
    </div>
  );
}

export default ShowCat;
