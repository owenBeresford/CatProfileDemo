import { Cat } from '../types/Cat';
import { KnownSports } from '../types/KnownSports';

export function getPreferredLanguage():string {
    if(!('language' in navigator) || navigator.language.length===0) {
        return LANG_UK;       // I understand a US company may disagree with this
    }
	if(Array.isArray( navigator.language)) {
	    return navigator.language[0].toLocaleLowerCase();
	} else {
	    return navigator.language.toLocaleLowerCase();
	}
}
export const LANG_UK='en-gb';
const DEFAULT_NAME="Default athlete";

// this is too small to be its own component
// yes there are some libraries that offer features like this; 
// but the code to set them up is about the same volume as below
export function renderDate(d:Date):string {
	const lang=getPreferredLanguage();
    if(lang===LANG_UK) {
        return d.getUTCFullYear()+"-"+d.getUTCMonth()+"-"+d.getUTCDate();
    }
    if(lang==="en-us") {
        return d.getUTCMonth()+"-"+d.getUTCDate()+"-" +d.getUTCFullYear();
    } else {
    // add more code here
        return d.toString();
    }
}

export function getDefaultSelfie():string {
    return  '/default-face.svg';
}

export function defaultCat(cur:Cat|null ):Cat {
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
    } as Cat;
}

// If sharedCat is in default state, prefer local value, otherwise prefer non-empty shared values
export function mapInitialValue<T>(shared:Cat, field: T, defaultVal: T):T {
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
