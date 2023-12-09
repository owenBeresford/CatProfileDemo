import { KnownSports } from "./KnownSports";

/**
 * Data members to describe a Cat in RAM.
 * @interface
 */
export interface Cat {
  name: string;
  dob: Date;
  team: string;
  gender: string;
  sports: Array<KnownSports>;
  about: string;
  interests: string;
  image: string | null;   // want this to be a Blob
  ID: number | null;
}

/**
 * Data members to describe a Cat in an API.
 *
 * @interface
 */
export interface ShippingCat extends Omit<Cat, 'dob'> { ID:number, dob:number, }

/**
 * Three event handlers to adjust Cats.
 */
export type storeACat = (a: Cat) => void;
export type removeableCat = (a: Cat | null) => void;
export type storeCats = (a: Array<Cat>) => void;

/**
 * Array of keys for enumeration.
 * maybe replace with keyof.
 */
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

/**
 * Type validation filter, for a Cat.
 * Note similar but different to below function.
 * Adding a Schema would be a nice touch, but no time in initial version.
 */
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

/**
 * Type validation filter, for ShippingCat.
 * Note similar but different to above function.
 */
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

/**
 * A default value for the age field in a Cat
 */
export const DEFAULT_BIRTH_DATE = new Date("2019-07-01");
