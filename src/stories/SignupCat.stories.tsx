import React from "react";
import SignupCat, { InnerSignupCat } from "../client/components/SignupCat";
import { BrowserRouter } from "react-router-dom";
// import { actions, action } from "@storybook/addon-actions";
import { AllCats, smolCat } from "./Cats.fixture";
import { Cat, storeACat, removeableCat } from "../client/types/Cat";
import { TESTdefaultCat } from "../client/services/util";

const store: storeACat = (i: Cat): void => {
  return;
};
const update: removeableCat = (i: Cat | null): void => {
  return;
};

const argTypes = {
  currentCats: { type: { name: "Array<Cat>", required: true } },
  current: { type: { name: "Cat", required: true } },
  updateCat: { type: { name: "storeACat", required: true } },
  removeCat: { type: { name: "removeableCat", required: true } },
};

export default {
  title: "SignupCat",
  component: SignupCat,
  argTypes,
  //  parameters:{
  //		actions:{
  //		 handles: ['trigger', '#togFencing'],
  //				 }
  //	}
};

const f1 = (): Array<Cat> => {
  return AllCats;
};
const f2 = (): Cat => {
  return smolCat;
};
const f3 = (): Cat => {
  return AllCats[1];
};

// likely state for a new signup
export const STEP0 = () => {
  return (
    <BrowserRouter>
      <InnerSignupCat
        currentCats={f1}
        current={TESTdefaultCat}
        updateCat={store}
        removeCat={update}
        ID={""}
      />
    </BrowserRouter>
  );
};

// likely state for an edit with minimal data
export const STEP1 = () => {
  return (
    <BrowserRouter>
      <InnerSignupCat
        currentCats={f1}
        current={f2}
        updateCat={store}
        removeCat={update}
        ID={"" + (Math.floor(Number.MIN_SAFE_INTEGER / 2) + 100)}
      />
    </BrowserRouter>
  );
};

// likely state for an edit with maximal data
export const STEP2 = () => {
  return (
    <BrowserRouter>
      <InnerSignupCat
        currentCats={f1}
        current={f3}
        updateCat={store}
        removeCat={update}
        ID={"" + (Math.floor(Number.MIN_SAFE_INTEGER / 2) + 101)}
      />
    </BrowserRouter>
  );
};
