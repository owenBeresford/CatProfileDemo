import { KnownSports } from "./KnownSports";
import { Model, Document } from "mongoose";

/**
 * Data members to describe a Cat in RAM.   
 * This could be reduced to a type extend on the ID and dob
 * @interface
 */
export interface Cat {
  ID: string | null;
  name: string;
  dob: number;
  team: string;
  gender: string;
  sports: Array<KnownSports>;
  about: string;
  interests: string;
  image: string | null;
  // want this to be a Blob
}

/**
 * CatDocument ~ A conversion to Mongoose types 
 * @typeDef
 */
export interface CatDocument extends Cat, Document {}

/**
 * CatModel ~ A conversion to Mongoose types 
 * @typeDef
 */
export type CatModel = Model<CatDocument>;

/**
 * CatDump ~ An array of Cats, used in API results and serialisation  
 * @typeDef  
 */
export type CatDump = Array<Cat>;

/**
 * Array of keys for enumeration.
 * maybe replace with keyof.
 */ 
export const KeysOfCat = [
  "name",
  "dob",
  "team",
  "gender",
  "sports",
  "about",
  "interests",
  "image",
  "ID",
];

/**
 * Type validation filter, for a Cat.
 * Note similar but different to below function.
 * Adding a Schema would be a nice touch, but no time in initial version.
 */ 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCat(o: any): o is Cat {
  let good = KeysOfCat.length;

  KeysOfCat.map((val: string /* , i:number */): number => {
    if (val in o) {
      if (val === "dob" && typeof o[val] === "number" && o[val] > 1000000) {
        good--;
      } else if (val === "ID" && typeof o[val] === "number" && o[val] > 0) {
        good--;
      } else if (val === "image") {
        good--;
      } else if (o[val].length > 0) {
        good--;
      }
    }
    return good;
  });
  return good === 0;
}

