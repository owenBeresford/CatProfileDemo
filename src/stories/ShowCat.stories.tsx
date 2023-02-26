import React from "react";
import ShowCat from "../client/components/ShowCat";
import { BrowserRouter } from "react-router-dom";
// import { actions, action } from "@storybook/addon-actions";
import { Cat, storeACat } from "../client/types/Cat";
import { AllCats } from "./Cats.fixture";
const [smolCat, bigCat, genericAsiaCat, genericArabCat] = AllCats;

// https://storybook.js.org/docs/react/essentials/actions
const argTypes = {
  current: { type: { name: "Cat|null", required: true } },
  isChild: { type: { name: "boolean", required: true } },
  removeCat: { type: { name: "storeACat", required: true } },
  trigger: {
    action: "click",
  },
};

const remove: storeACat = (i: Cat): void => {
  return;
};

export default {
  title: "ShowCat",
  component: ShowCat,
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
      <ShowCat current={null} isChild={true} removeCat={remove} />{" "}
    </BrowserRouter>
  );
};
export const STEP1 = () => {
  return (
    <BrowserRouter>
      <ShowCat current={null} isChild={false} removeCat={remove} />
    </BrowserRouter>
  );
};
export const STEP2 = () => {
  return (
    <BrowserRouter>
      <ShowCat current={smolCat} isChild={true} removeCat={remove} />
    </BrowserRouter>
  );
};
export const STEP3 = () => {
  return (
    <BrowserRouter>
      <ShowCat current={smolCat} isChild={false} removeCat={remove} />
    </BrowserRouter>
  );
};
export const STEP4 = () => {
  return (
    <BrowserRouter>
      <ShowCat current={bigCat} isChild={true} removeCat={remove} />
    </BrowserRouter>
  );
};
export const STEP5 = () => {
  return (
    <BrowserRouter>
      <ShowCat current={bigCat} isChild={false} removeCat={remove} />
    </BrowserRouter>
  );
};
export const STEP6 = () => {
  return (
    <BrowserRouter>
      <ShowCat current={genericAsiaCat} isChild={false} removeCat={remove} />
    </BrowserRouter>
  );
};
export const STEP7 = () => {
  return (
    <BrowserRouter>
      <ShowCat current={genericArabCat} isChild={false} removeCat={remove} />
    </BrowserRouter>
  );
};
