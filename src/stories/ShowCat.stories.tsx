import React from "react";
import ShowCat, { InnerShowCatProps, ShowCatInner } from "../client/components/ShowCat";
import { BrowserRouter } from "react-router-dom";
// import { actions, action } from "@storybook/addon-actions";
import { Cat, storeACat, removeableCat } from "../client/types/Cat";
import { AllCats } from "./Cats.fixture";
import { TESTdefaultCat, noop } from "../client/services/util";
// this is valid JS (except type hints), but doesn't seem to work for TS.
//const [smolCat:Cat, bigCat:Cat, genericAsiaCat:Cat, genericArabCat:Cat] = AllCats;

// https://storybook.js.org/docs/react/essentials/actions
const argTypes = {
  current: { type: { name: "Cat|null", required: true } },
  isChild: { type: { name: "boolean", required: true } },
  removeCat: { type: { name: "removeableCat", required: true } },
  listenToState: { type: { name: "( a:()=>void )=>void", required: true } }, 
  aKey: { type: {name: "string", required: true} },
  trigger: {
    action: "click",
  },
};

const remove: removeableCat = (i: Cat|null): void => {
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
      <ShowCatInner current={TESTdefaultCat} isChild={true} removeCat={remove} listenToState={noop} aKey={"test0"} ID={"1"}  /> 
    </BrowserRouter>
  );
};
export const STEP1 = () => {
  return (
    <BrowserRouter>
      <ShowCatInner current={TESTdefaultCat} isChild={false} removeCat={remove} listenToState={noop} aKey={"test1"} ID={"1"} />
    </BrowserRouter>
  );
};
export const STEP2 = () => {
  return (
    <BrowserRouter>
      <ShowCatInner current={() => AllCats[0]} isChild={true} removeCat={remove} listenToState={noop} aKey={"test2"} ID={ ""+AllCats[0].ID}/>
    </BrowserRouter>
  );
};
export const STEP3 = () => {
  return (
    <BrowserRouter>
      <ShowCatInner current={() => AllCats[0]} isChild={false} removeCat={remove} listenToState={noop} aKey={"test3"} ID={ ""+AllCats[0].ID }/>
    </BrowserRouter>
  );
};
export const STEP4 = () => {
  return (
    <BrowserRouter>
      <ShowCatInner current={() => AllCats[1]} isChild={true} removeCat={remove} listenToState={noop} aKey={"test4"} ID={""+ AllCats[1].ID }/>
    </BrowserRouter>
  );
};
export const STEP5 = () => {
  return (
    <BrowserRouter>
      <ShowCatInner current={() => AllCats[1]} isChild={false} removeCat={remove} listenToState={noop} aKey={"test5"} ID={""+ AllCats[1].ID }/>
    </BrowserRouter>
  );
};
export const STEP6 = () => {
  return (
    <BrowserRouter>
      <ShowCatInner current={() => AllCats[2]} isChild={false} removeCat={remove} listenToState={noop} aKey={"test6"} ID={""+ AllCats[2].ID }/>
    </BrowserRouter>
  );
};
export const STEP7 = () => {
  return (
    <BrowserRouter>
      <ShowCatInner current={() => AllCats[3]} isChild={false} removeCat={remove} listenToState={noop} aKey={"test7"} ID={""+ AllCats[3].ID }/>
    </BrowserRouter>
  );
};
