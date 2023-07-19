import { assert, describe, it } from "vitest";

import { nextId } from "../services/util";
 
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
