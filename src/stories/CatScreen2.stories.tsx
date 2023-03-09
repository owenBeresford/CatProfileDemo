import React from "react";
import CatScreen2 from "../client/components/CatScreen2";
// import { actions, action } from "@storybook/addon-actions";
import { BrowserRouter } from "react-router-dom";
import { ChangeTab } from "../client/types/ChangeTab";
import { Cat, storeACat, removeableCat } from "../client/types/Cat";
import { smolCat } from "./Cats.fixture";

const changeTab: ChangeTab = (i: number): void => {
  return;
};

const changeCat: storeACat = (a: Cat): void => {
  return;
};
const update: removeableCat = (i: Cat | null): void => {
  return;
};

const argTypes = {
  build: { type: { name: "Cat", required: true } },
  incTab: { type: { name: "ChangeTab", required: true } },
  updateCat: { type: { name: "storeACat", required: true } },
  removeCat: { type: { name: "removeableCat", required: true } },
};

export default {
  title: "CatScreen2",
  component: CatScreen2,
  argTypes,
};

export const STEP0 = () => {
  return (
    <BrowserRouter>
      <CatScreen2
        build={smolCat}
        incTab={changeTab}
        updateCat={changeCat}
        removeCat={update}
        aKey={"WWW3"}
      />
    </BrowserRouter>
  );
};
