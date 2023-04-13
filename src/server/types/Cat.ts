import { KnownSports } from "./KnownSports";
import { Model, Document } from "mongoose";

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

// this is Cat
export interface CatDocument extends Cat, Document {}
export type CatModel = Model<CatDocument>;
export type CatDump = Array<Cat>;

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

// This is a runtime process, not type washing
// IOIO TODO adding a Schema would be a nice touch, but no time now
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
