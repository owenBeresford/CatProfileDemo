import { KnownSports } from './KnownSports';
 
export interface Athlete {
    name:string;
    dob:Date;
    team:string;
    gender:string;
    sports:Array<KnownSports>;
    about:string;
    interests:string;
    image:string | null; 
    // want this to be a Blob 
}

export interface ShippingAthlete {
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

const KeysOfAthlete =[
    'name',
    'dob',
    'team',
    'gender',
    'sports',
    'about',
    'interests',
    'image',
];

// this is a runtime process, not type washing
// adding a Schema would be a nice touch, but no time now
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isAthlete(o: any): o is Athlete {
    let good=KeysOfAthlete.length;
    KeysOfAthlete.map((val:string):number => {
         if( val in o ) {
			if(val==='dob' && typeof o[val]==='object') { good--; }
			else if(val ==='image') { good--; }
			else if( o[val].length >0) { good--; }
        } 
		return good;
    });
    return good===0;
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isShippingAthlete(o: any):o is ShippingAthlete {
    let good=KeysOfAthlete.length;
    KeysOfAthlete.map((val:string ):number => {
         if( val in o ) {
			if(val==='dob' && typeof o[val]==='number') { good--; }
			else if(val ==='image') { good--; }
			else if( o[val].length >0) { good--; }
        } 
		return good;
    });
    return good===0;
}
