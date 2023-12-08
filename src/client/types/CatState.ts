import { Action } from "redux";
import { Cat } from "./Cat";

/**
 * Three literals that are keys for state alteration events
 * @event
 */
export const SET_CATS = "SET_CATS";
export const SET_A_CAT = "SET_A_CAT";
export const SET_KEY = "aKey"; // I expect a React or Redux feature may use 'key' as a key.

/**
 * The values to store in the state
 */
export type CatStateType = {
  allCats: Array<Cat> | null;
  cat: Cat | null;
  key: string;
};

/**
 * The values modelled as an Action for better integration with Redux
 */
export type CatAction = Action & {
  collection: Array<Cat> | null;
  single: Cat | null;
  key: string;
};

/**
 * Methods outside of the State that are used to manipulate Cats in the State
 */
export interface KnowACat {
  key: string;
  updateCats(a: Array<Cat>): void;
  setCat(a: Cat): void;
  currentCats(): Array<Cat>;
  current(): Cat;
  listen(updateMe: () => void, b: string): void;
  updateCat(a: Cat): void;
  removeCat(a: Cat | null): void;
  changeCat(dom: HTMLElement): void;
}

/**
 * Three functions to pass state outputs into Components
 */
export type accessCurrentCats = () => Array<Cat>;

/**
 * Three functions to pass state outputs into Components
 */
export type accessACat = () => Cat;

/**
 * Three functions to pass state outputs into Components
 */
export type listenHandler = (a: () => void, b: string) => void;
