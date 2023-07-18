import { assert, describe, it } from "vitest";

import { nextId } from "../services/util";
// the utils file is the most algorithmically important file, and the least OO; fortunately these functions are isolated to testable

describe("nextId check", () => {
  it("id check", () => {
    let count = 1;
    assert.equal("obj" + count, nextId(), "test 6");
    count++;
    assert.equal("obj" + count, nextId(), "test 7");
    count++;
    assert.equal("obj" + count, nextId(), "test 8");
    count++;
    assert.equal("obj" + count, nextId(), "test 9");
    count++;
    assert.equal("obj" + count, nextId(), "test 10");
  });
});
