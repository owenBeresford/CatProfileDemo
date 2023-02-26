import React from "react";
import ListCats from "../client/components/ListCats";
import { BrowserRouter } from "react-router-dom";
import { Cat, storeCats, storeACat } from "../client/types/Cat";
// import { actions, action } from "@storybook/addon-actions";
import { AllCats } from "./Cats.fixture";

const store: storeACat = (i: Cat): void => {
  return;
};

const storeMany: storeCats = (i: Array<Cat>): void => {
  return;
};

const argTypes = {
  currentCats: { type: { name: "Array<Cat>", required: true } },
  updateCats: { type: { name: "storeCats", required: true } },
  updateCat: { type: { name: "storeACat", required: true } },
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
        currentCats={AllCats}
        updateCats={storeMany}
        updateCat={store}
      />
    </BrowserRouter>
  );
};
