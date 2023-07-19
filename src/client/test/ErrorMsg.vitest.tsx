import React from "react";
import { assert, describe, expect, it } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";

import ErrorMsg, { ErrorMsgProps } from "../components/ErrorMsg";

describe("Simple component test 1", () => {
  it("Can load ErrorMsg", () => {
    const args = {
      err: "this is the the error",
      lead: "this is the intro",
    } as ErrorMsgProps;
    const BLOB = render(<ErrorMsg err={args.err} lead={args.lead} />);
    assert.notEqual(BLOB.getByTestId("obj1"), null, "we have a component");
    assert.notEqual(BLOB.getByTestId("obj1"), undefined, "we have a component");

    assert.equal(
      BLOB.queryByText("this is the intro") instanceof HTMLDivElement,
      true,
      "we find out intro (no markup)"
    );
    const tmp:HTMLTextAreaElement= screen.queryByText("this is the the error") as HTMLTextAreaElement; 
    assert.equal(
      tmp.readOnly,
      true,
      "main error is RO (I hope this var doesnt move with each version of react)"
    );

    const BLOB2 = render(<ErrorMsg {...args} />);
    assert.notEqual(
      BLOB2.getByTestId("obj2"),
      null,
      "we have a component (2nd ID)"
    );
  });

  cleanup();
});
