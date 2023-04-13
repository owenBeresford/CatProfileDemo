import { Cat } from "../types/Cat";
import { defaultCat } from "./util";
import { Transport, AxiosResponse } from "../types/Transport";
import { UseTransport } from "../services/Transport";
import { Store, Action } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  SET_CATS,
  SET_A_CAT,
  SET_KEY,
  CatStateType,
  CatAction,
  KnowACat,
} from "../types/CatState";

// Treating HTTP as atomic, this class is stateless.  You cannot mutate it.
const API: Transport<Array<Cat>, string> = UseTransport() as Transport<
  Array<Cat>,
  string
>;

export class CatState implements KnowACat {
  store: Store;
  public key: string;

  public constructor() {
    this.key = "0aList";
    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
    const SELF = this;
    const Zero = {
      allCats: [] as Array<Cat>,
      cat: defaultCat(null, 0) as Cat,
      key: "0aList",
    };

    const reducer = (state: CatStateType = Zero, action: CatAction) => {
      SELF.key = parseInt(SELF.key, 10) + 1 + "aList";
      switch (action.type) {
        case SET_CATS:
          return { ...state, allCats: action.collection, key: SELF.key };

        case SET_A_CAT:
          return { ...state, cat: action.single, key: SELF.key };

        case SET_KEY:
          SELF.key = action.key;
          return { ...state, key: SELF.key };

        default:
          console.warn("Unknown type supplied " + action.type);
      }
      return state;
    };

    this.store = configureStore({ reducer });
    // IOIO add poll after a second, to see what the state looks like after all the components are built
    API.getAll(undefined).then((dd) => {
      const importList: AxiosResponse<Array<Cat>> = dd as AxiosResponse<
        Array<Cat>
      >;
      SELF.store.dispatch({
        type: SET_CATS,
        collection: importList.data as Array<Cat>,
      });
    });

    // this stack of bind()s is necessary, as I am replacing useState hooks with these methods
    // but when they get executed, the context goes missing
    this.updateCats = this.updateCats.bind(this);
    this.setCat = this.setCat.bind(this);
    this.currentCats = this.currentCats.bind(this);
    this.current = this.current.bind(this);
    this.listen = this.listen.bind(this);
    this.updateCat = this.updateCat.bind(this);
    this.removeCat = this.removeCat.bind(this);
    this.changeCat = this.changeCat.bind(this);
    // TODO: Add feature to refil local state after an amount of time; as other clients may have made/ changed a cat
  }

  public updateCats(a: Array<Cat>): void {
    this.key = parseInt(this.key, 10) + 1 + "aList";
    this.store.dispatch({ type: SET_CATS, collection: a });
  }

  public setCat(a: Cat): void {
    this.key = parseInt(this.key, 10) + 1 + "aList";
    this.store.dispatch({ type: SET_A_CAT, single: a });
  }

  public currentCats(): Array<Cat> {
    const ttt = this.store.getState();
    return ttt.allCats ?? [];
  }

  public current(): Cat {
    const ttt = this.store.getState();
    return ttt.cat;
  }

  isCatGood(a: Cat): void {
    if (a.ID === null) {
      throw new Error(
        "Cats must have an ID code, how did it gets it's label off?"
      );
    }
    if (a.ID < 0 || a.ID > this.currentCats().length) {
      throw new Error(
        "This cat doesn't seem to be a local. Where did it come from?"
      );
    }
  }

  public listen(updateMe: () => void, nom: string) {
    console.log("Add listener for " + nom + " changes");
    return this.store.subscribe(updateMe);
  }

  public updateCat(a: Cat): void {
    this.key = parseInt(this.key, 10) + 1 + "aList";
    if (a === null || a.ID === null) {
      throw new Error(
        "Cats must have an ID code, how did it gets it's label off?"
      );
    }
    // you are allowed to set a new cat on cats.length on purpose
    if (a.ID < 0 || a.ID > this.currentCats().length) {
      throw new Error(
        "This cat doesn't seem to be a local. Where did it come from?"
      );
    }
    this.store.dispatch({ type: SET_A_CAT, single: a as Cat });
    const ttt = this.currentCats();
    ttt[a.ID] = a;
    this.store.dispatch({ type: SET_CATS, collection: ttt as Array<Cat> });
  }

  public removeCat(a: Cat | null): void {
    if (!a) {
      a = this.current();
    }
    this.key = parseInt(this.key, 10) + 1 + "aList";

    if (a.ID === null) {
      throw new Error(
        "Cats must have an ID code, how did it gets it's label off?"
      );
      //return;
    }
    if (a.ID < 0 || a.ID > this.currentCats().length) {
      throw new Error(
        "This cat doesn't seem to be a local. Where did it come from?"
      );
      //return;
    }
    const tmp = this.currentCats();
    tmp.splice(a.ID, 1);
    this.store.dispatch({ type: SET_CATS, collection: tmp });
    if (a.ID === this.current().ID) {
      this.store.dispatch({
        type: SET_A_CAT,
        single: defaultCat(null, tmp.length),
      });
    }
  }

  public changeCat(dom: HTMLElement): void {
    this.key = parseInt(this.key, 10) + 1 + "aList";
    while (!dom.getAttribute("data-id") && dom.parentNode !== dom) {
      if (dom.parentNode) {
        dom = dom.parentNode as HTMLElement;
      }
    }
    const id: string | null = dom.getAttribute("data-id");
    if (typeof id !== "string") {
      return;
    }

    const tmp = this.currentCats();
    if (parseInt(id, 10) < tmp.length) {
      this.store.dispatch({ type: SET_A_CAT, single: tmp[parseInt(id, 10)] });
    }
  }
}
