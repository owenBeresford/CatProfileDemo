"use strict";
import jest from "jest";
import { doCurl_CB } from './common';

const BASE_URL = "http://192.168.0.35:3000";
const BASE2_URL = BASE_URL + "/test/";
// jest.setTimeout(10000);
// TODO: factor out the err1 to the common, need to write a function returning function, or something

//
// please note this test will sometimes fail as it talking to the TEST API which will fail 10% of the time by design.
//


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

  doCurl_CB(BASE_URL + "/", pass1, err1);
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

  doCurl_CB(BASE2_URL + "cat/all", pass1, err1);
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

  doCurl_CB(BASE2_URL + "cat/1", pass1, err1);
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

  doCurl_CB(BASE2_URL + "cat/1", pass1, err1);
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
  }; 
  doCurl_CB(BASE2_URL + "cat/", pass1, err1, XXX);
});
