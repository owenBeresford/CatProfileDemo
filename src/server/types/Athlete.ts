import { KnownSports } from './KnownSports';
import { Model, Document } from 'mongoose';
 
export interface Athlete {
    ID:string|null;
    name:string;
    dob:number;
    team:string;
    gender:string;
    sports:Array<KnownSports>;
    about:string;
    interests:string;
    image:string | null; 
    // want this to be a Blob 
}

// this is Athlete
export interface AthleteDocument extends Athlete, Document {};
export interface AthleteModel extends Model<AthleteDocument> {};
export type AthleteDump = Array<Athlete>;  

export const KeysOfAthlete =[
    'name',
    'dob',
    'team',
    'gender',
    'sports',
    'about',
    'interests',
    'image',
];

// This is a runtime process, not type washing
// IOIO TODO adding a Schema would be a nice touch, but no time now
export function isAthlete(o: any): o is Athlete {
    let good=KeysOfAthlete.length;

    KeysOfAthlete.map((val:string, i:number):number => {
         if( val in o ) {
			if(val==='dob' && typeof o[val]==='number') { good--; }
			else if(val ==='image') { good--; }
			else if( o[val].length >0) { good--; }
        } 
		return good;
    });
    return good===0;
}

