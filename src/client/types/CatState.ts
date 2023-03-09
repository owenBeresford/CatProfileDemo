import { Action } from "redux";
import { Cat } from "./Cat";

export const SET_CATS = "SET_CATS";
export const SET_A_CAT = "SET_A_CAT";
export const SET_KEY = "aKey"; // I expect a React or Redux feature may use 'key' as a key.

export type CatStateType = {
  allCats: Array<Cat> | null;
  cat: Cat | null;
  key: string;
};
export type CatAction = Action & {
  collection: Array<Cat> | null;
  single: Cat | null;
  key: string;
};

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

export type accessCurrentCats = () => Array<Cat>;
export type accessACat = () => Cat;
export type listenHandler = (a: () => void, b: string) => void;
