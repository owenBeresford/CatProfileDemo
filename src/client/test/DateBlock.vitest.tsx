import { assert, describe, it } from "vitest";
import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";

import DateBlock, { DateProps } from "../components/DateBlock";

const TEST1 = (i: number) => {
  console.log("next tab, ... GO!");
};

describe("Simple component test 2", () => {
  it("Can load DateBlock", () => {
    const args = {
      passback: TEST1,
      initialVal: 1000000000,
    } as DateProps;

    const BLOB = render(
      <DateBlock passback={args.passback} initialVal={args.initialVal} />
    );
	try {
	    assert.notEqual(BLOB.getByTestId("obj1"), null, "we have a component");
	    assert.notEqual(BLOB.getByTestId("obj1"), undefined, "we have a component");
	} catch(e) {
	    assert.notEqual(BLOB.getByTestId("obj2"), null, "we have a component");
	    assert.notEqual(BLOB.getByTestId("obj2"), undefined, "we have a component");
		
	}

    // need to create code to look at events...
  });

  cleanup();
});
