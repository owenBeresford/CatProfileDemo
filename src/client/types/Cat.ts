import { KnownSports } from "./KnownSports";

export interface Cat {
  name: string;
  dob: Date;
  team: string;
  gender: string;
  sports: Array<KnownSports>;
  about: string;
  interests: string;
  image: string | null;
  ID: number|null;
  // want this to be a Blob
}

export interface ShippingCat {
  name: string;
  dob: number;
  team: string;
  gender: string;
  sports: Array<KnownSports>;
  about: string;
  interests: string;
  image: string | null;
  ID: number;
  // want this to be a Blob
}

export type storeACat= (a: Cat) => void;
export type storeCats= (a: Array<Cat>) => void;

const KeysOfCat = [
  "name",
  "dob",
  "team",
  "gender",
  "sports",
  "about",
  "interests",
  "image",
];

// this is a runtime process, not type washing
// adding a Schema would be a nice touch, but no time now
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCat(o: any): o is Cat {
  let good = KeysOfCat.length;
  KeysOfCat.map((val: string): number => {
    if (val in o) {
      if (val === "dob" && typeof o[val] === "object") {
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

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isShippingCat(o: any): o is ShippingCat {
  let good = KeysOfCat.length;
  KeysOfCat.map((val: string): number => {
    if (val in o) {
      if (val === "dob" && typeof o[val] === "number") {
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

export const DEFAULT_BIRTH_DATE = new Date("2019-07-01");
