import { Athlete } from '../types/Athlete';

export function getPreferredLanguage():string {
    if(!('language' in navigator) || navigator.language.length===0) {
        return LANG_UK;       // I understand a US company may disagree with this
    }
    return navigator.language[0].toLocaleLowerCase();
}
export const LANG_UK='en-gb';

// this is too small to be its own component
// yes there are some libraries that offer features like this; 
// but the code to set them up is about the same volume as below
export function renderDate(d:Date):string {
    if(getPreferredLanguage()===LANG_UK) {
        return d.getUTCFullYear()+"-"+d.getUTCMonth()+"-"+d.getUTCDay();
    }
    if(getPreferredLanguage()==="en-us") {
        return d.getUTCMonth()+"-"+d.getUTCDay()+"-" +d.getUTCFullYear();
    } else {
    // add more code here
        return d.toString();
    }
}

export function getDefaultSelfie():string {
    return  '/default-face.svg';
}

export function defaultAthlete():Athlete {
    return {
        name:"Default athlete",
        dob:new Date(),
        team:"",
        gender:"",
        sports:["American Football"],
        about:"",
        interests:"",
        image:null 
    } as Athlete;
}

