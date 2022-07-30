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
