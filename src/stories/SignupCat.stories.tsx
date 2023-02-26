import React from "react";
import SignupCat from "../client/components/SignupCat";
import { BrowserRouter } from "react-router-dom";
// import { actions, action } from "@storybook/addon-actions";
import { AllCats, smolCat } from "./Cats.fixture";
import { Cat, storeACat } from "../client/types/Cat";

const store: storeACat = (i: Cat): void => {
  return;
};

const argTypes = {
  currentCats: { type: { name: "Array<Cat>", required: true } },
  current: { type: { name: "Cat", required: true } },
  updateCat: { type: { name: "storeACat", required: true } },
  removeCat: { type: { name: "storeACat", required: true } },
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

export const STEP0 = () => {
  return (
    <BrowserRouter>
      <SignupCat
        currentCats={AllCats}
        current={smolCat}
        updateCat={store}
        removeCat={store}
      />{" "}
    </BrowserRouter>
  );
};
