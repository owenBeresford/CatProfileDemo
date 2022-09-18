import { Athlete } from '../types/Athlete';
import { KnownSports } from '../types/KnownSports';

export function getPreferredLanguage():string {
    if(!('language' in navigator) || navigator.language.length===0) {
        return LANG_UK;       // I understand a US company may disagree with this
    }
    return navigator.language[0].toLocaleLowerCase();
}
export const LANG_UK='en-gb';
const DEFAULT_NAME="Default athlete";

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

export function defaultAthlete(cur:Athlete|null ):Athlete {
    if(cur) { 
		if(typeof cur.dob !=='object') {
			cur.dob=new Date(cur.dob);
		}
		return cur;
	}

    return {
        name:DEFAULT_NAME,
        dob:new Date(),
        team:"",
        gender:"",
        sports:["American Football"],
        about:"",
        interests:"",
        image:null 
    } as Athlete;
}

// If sharedAthlete is in default state, prefer local value, otherwise prefer non-empty shared values
export function mapInitialValue<T>(shared:Athlete, field: T, defaultVal: T):T {
	if(shared.name===DEFAULT_NAME) { return defaultVal; }
	else if( field) { return field; }
	else { return defaultVal; }
}

// snarl at whatever beaurocrat made types for Array.includes 
// pour example https://stackoverflow.com/questions/71639989/typescript-why-array-includes-expects-searchelement-to-be-never-type

export function includesWithBetterTyping(ar:Array<KnownSports>, key:KnownSports):boolean {
	let found=false;
	ar.forEach((cur:KnownSports, i:number):number => { if( cur===key) { found=true; } return i; });
	return found;
}
