import React from "react";
import DateBlock from "../client/components/DateBlock";
import { BrowserRouter } from "react-router-dom";
//import { actions, action } from "@storybook/addon-actions";
import { ChangeTab } from "../client/types/ChangeTab";

const argTypes = {
  passback: { type: { name: "ChangeTab", required: true } },
  initialVal: { type: { name: "number", required: true } },
};

const changeTab: ChangeTab = (i: number): void => {
  return;
};

export default {
  title: "DateBlock",
  component: DateBlock,
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
      <DateBlock passback={changeTab} initialVal={new Date().getTime()} />{" "}
    </BrowserRouter>
  );
};
export const STEP1 = () => {
  return (
    <BrowserRouter>
      <DateBlock
        passback={changeTab}
        initialVal={new Date("2000-04-05").getTime()}
      />
    </BrowserRouter>
  );
};
export const STEP2 = () => {
  return (
    <BrowserRouter>
      <DateBlock passback={changeTab} initialVal={NaN} />
    </BrowserRouter>
  );
};
export const STEP3 = () => {
  return (
    <BrowserRouter>
      <DateBlock passback={alert} initialVal={new Date().getTime()} />
    </BrowserRouter>
  );
};
