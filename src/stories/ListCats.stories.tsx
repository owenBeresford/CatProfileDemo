import React from "react";
import ListCats from "../client/components/ListCats";
import { BrowserRouter } from "react-router-dom";
import { Cat } from "../client/types/Cat";
// import { actions, action } from "@storybook/addon-actions";
import { AllCats } from "./Cats.fixture";

const store  = (i: HTMLElement): void => {
  return;
};

const stateChange=(a:()=>void ):void =>{
  return
}

const argTypes = {
  currentCats: { type: { name: "Array<Cat>", required: true } },
  changeCat: { type: { name: "(i: HTMLElement): void", required: true } },
  stateChange: { type: { name: "(a:()=>void )=>void ", required: true } },
  
};

export default {
  title: "ListCats",
  component: ListCats,
  argTypes,
};

export const STEP0 = () => {
  return (
    <BrowserRouter>
      <ListCats
        currentCats={() => {return AllCats}}
        changeCat={store}
        listenToState={stateChange}
        aKey={"SSSS"}
      />
    </BrowserRouter>
  );
};
