"use strict";
/**
      toBe: [Function: throwingMatcher],
      toBeCloseTo: [Function: throwingMatcher],
      toBeDefined: [Function: throwingMatcher],
      toBeFalsy: [Function: throwingMatcher],
      toBeGreaterThan: [Function: throwingMatcher],
      toBeGreaterThanOrEqual: [Function: throwingMatcher],
      toBeInstanceOf: [Function: throwingMatcher],
      toBeLessThan: [Function: throwingMatcher],
      toBeLessThanOrEqual: [Function: throwingMatcher],
      toBeNaN: [Function: throwingMatcher],
      toBeNull: [Function: throwingMatcher],
      toBeTruthy: [Function: throwingMatcher],
      toBeUndefined: [Function: throwingMatcher],
      toContain: [Function: throwingMatcher],
      toContainEqual: [Function: throwingMatcher],
      toEqual: [Function: throwingMatcher],
      toHaveLength: [Function: throwingMatcher],
      toHaveProperty: [Function: throwingMatcher],
      toMatch: [Function: throwingMatcher],
      toMatchObject: [Function: throwingMatcher],
      toStrictEqual: [Function: throwingMatcher],
      lastCalledWith: [Function: throwingMatcher],
      lastReturnedWith: [Function: throwingMatcher],
      nthCalledWith: [Function: throwingMatcher],
      nthReturnedWith: [Function: throwingMatcher],
      toBeCalled: [Function: throwingMatcher],
      toBeCalledTimes: [Function: throwingMatcher],
      toBeCalledWith: [Function: throwingMatcher],
      toHaveBeenCalled: [Function: throwingMatcher],
      toHaveBeenCalledTimes: [Function: throwingMatcher],
      toHaveBeenCalledWith: [Function: throwingMatcher],
      toHaveBeenLastCalledWith: [Function: throwingMatcher],
      toHaveBeenNthCalledWith: [Function: throwingMatcher],
      toHaveLastReturnedWith: [Function: throwingMatcher],
      toHaveNthReturnedWith: [Function: throwingMatcher],
      toHaveReturned: [Function: throwingMatcher],
      toHaveReturnedTimes: [Function: throwingMatcher],
      toHaveReturnedWith: [Function: throwingMatcher],
      toReturn: [Function: throwingMatcher],
      toReturnTimes: [Function: throwingMatcher],
      toReturnWith: [Function: throwingMatcher],
      toThrow: [Function: throwingMatcher],
      toThrowError: [Function: throwingMatcher],
      toMatchInlineSnapshot: [Function: throwingMatcher],
      toMatchSnapshot: [Function: throwingMatcher],
      toThrowErrorMatchingInlineSnapshot: [Function: throwingMatcher],
      toThrowErrorMatchingSnapshot: [Function: throwingMatcher]
    */

import jest from "jest";
import { Curl } from "node-libcurl";
// import {Cat } from '../types/Cat';

const BASE_URL = "http://192.168.0.34:3000";
const BASE2_URL = BASE_URL + "/test/";
// jest.setTimeout(10000);

//
// please note this test will sometimes fail as it talking to the TEST API which will fail 10% of the time by design.
//

function wave(url, good1, bad1, post) {
  try {
    const curl = new Curl();
    curl.setOpt("URL", url);
    curl.setOpt("FOLLOWLOCATION", true);
    curl.setOpt("HTTPHEADER", [
      "upgrade-insecure-requests: 1",
      "cache-control: no-cache",
      "accept-language: en-GB,en;q=0.5",
      "user-agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:108.0) Gecko/20100101 Firefox/108.0",
    ]);
    if (post) {
      post = JSON.stringify(post);
      console.warn("trying to POST", post);
      curl.setOpt(Curl.option.POST, true);
      curl.setOpt(Curl.option.POSTFIELDS, "data=" + post);
    }

    curl.on("end", good1.bind(curl));
    curl.on("error", bad1.bind(curl));
    curl.perform();
  } catch (e) {
    console.warn("[ERROR] Network error with " + url + " :: " + e);
    bad1(e, url);
  }
}

// THIS FILE-NAME IS TERRIBLE but my local test API module is called Test

test("get index root asset", (done) => {
  function err1(a, b) {
    console.log(a, b);
    expect(500).toBe(204);
    done();
  }

  function pass1(statusCode, data, headers) {
    if (headers) {
      headers = headers[0];
    }

    expect(statusCode).toBe(200);
    expect(parseInt(headers["Content-Length"], 10)).toBeGreaterThan(500);
    expect(headers["Content-Type"]).toEqual("text/html; charset=UTF-8");
    expect(headers["Cache-Control"]).toMatch("public");
    done();
  }

  wave(BASE_URL + "/", pass1, err1);
});
// Assert: No HATEOS found.

test("get complete Cat catalogue (TEST API)", (done) => {
  function err1(a, b) {
    console.log("Did you set NODE_ENV = 'development'?", a, b);
    expect(500).toBe(204);
    done();
  }

  function pass1(statusCode, data, headers) {
    if (headers) {
      headers = headers[0];
    }

    expect(statusCode).toBe(200);
    expect(parseInt(headers["Content-Length"], 10)).toBeGreaterThan(100);
    expect(headers["Content-Type"]).toEqual("application/json; charset=utf-8");

    let d2 = JSON.parse(data);
    expect(d2).toBeInstanceOf(Array);
    expect(d2.length).toBeGreaterThan(2);

    for (let i = 0; i < d2.length; i++) {
      expect(d2[i]).toBeInstanceOf(Object);
    }

    done();
  }

  wave(BASE2_URL + "cat/all", pass1, err1);
});

test("get a Cat (TEST API)", (done) => {
  function err1(a, b) {
    console.log("Did you set NODE_ENV = 'development'?", a, b);
    expect(500).toBe(204);
    done();
  }

  function pass1(statusCode, data, headers) {
    if (headers) {
      headers = headers[0];
    }

    expect(statusCode).toBe(200);
    expect(parseInt(headers["Content-Length"], 10)).toBeGreaterThan(100);
    expect(headers["Content-Type"]).toEqual("application/json; charset=utf-8");

    let d2 = JSON.parse(data);
    expect(d2).toBeInstanceOf(Object);
    expect(d2.ID).toBe("111111111");
    done();
  }

  wave(BASE2_URL + "cat/1", pass1, err1);
});

test("GET a particular Cat (TEST API)", (done) => {
  function err1(a, b) {
    console.log("Did you set NODE_ENV = 'development'?", a, b);
    expect(500).toBe(204);
    done();
  }

  function pass1(statusCode, data, headers) {
    if (headers) {
      headers = headers[0];
    }

    expect(statusCode).toBe(200);
    expect(parseInt(headers["Content-Length"], 10)).toBeGreaterThan(100);
    expect(headers["Content-Type"]).toEqual("application/json; charset=utf-8");

    let d2 = JSON.parse(data);
    expect(d2).toBeInstanceOf(Object);
    expect(d2.ID).toBe("111111111");
    done();
  }

  wave(BASE2_URL + "cat/1", pass1, err1);
});

test("POST a particular Cat (TEST API)", (done) => {
  function err1(a, b) {
    console.log("Did you set NODE_ENV = 'development'?", a, b);
    expect(500).toBe(204);
    done();
  }

  function pass1(statusCode, data, headers) {
    if (headers) {
      headers = headers[0];
    }
    expect(statusCode).toBe(204);
    // no content, so content format
    //    expect(headers["Content-Type"]).toEqual("application/json; charset=utf-8");
    done();
  }

  let XXX = {
    ID: 3,
    name: "test2 test3 XXX",
    dob: 1663340872204,
    team: "poland",
    gender: "f",
    sports: [
      "Ice Hockey",
      "Martial Arts",
      "Mixed Martial Arts",
      "Modern Pentathlon",
    ],
    about:
      "dfggdfgdfgdfg XXX XXX dfgdf gdfg dgd fgdfgdfg dfgdg dfgdgdf gdgdfgd g dzgd gdgdfgdzf gzdfh fhzfg gcmhukfxj sfj xfgjh f",
    interests:
      "sdfs dfsfs dfsdfs dfsfs fsfsdfsdfas gdg dzdf gzdfghfgh zfgjdfhjxfghj dfgjhnxfzjhd fjnfszrys hj sry sgh",
    image: null,
  }; //  as Cat;
  wave(BASE2_URL + "cat/", pass1, err1, XXX);
});
