import { assert, describe, it } from "vitest";
import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";

import DateBlock, { DateBlockProps } from "../components/DateBlock";

const TEST1 = (i: number) => {
  console.log("next tab, ... GO!");
};

describe("Simple component test 2", () => {
  it("Can load DateBlock", () => {
    const args = {
      passback: TEST1,
      initialVal: 100000000,
    } as DateBlockProps;

    const BLOB = render(
      <DateBlock passback={args.passback} initialVal={args.initialVal} />
    );
    assert.notEqual(BLOB.getByTestId("obj1"), null, "we have a component");
    assert.notEqual(BLOB.getByTestId("obj1"), undefined, "we have a component");

    // need to create code to look at events...
  });

  cleanup();
});
