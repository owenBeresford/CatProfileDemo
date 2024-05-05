"use strict";
import { assert, describe, it } from "vitest";
import fs from "fs";
import path from "path";
// import { createRequire } from "node:module";

import { Curl } from "node-libcurl";

import { createPaths, delay, delay2, doCurl_CB } from './common';

// const require = createRequire(import.meta.url);
const [ __filename, __dirname ]=createPaths( ""+import.meta.url);
const BASE_URL = "http://192.168.0.35:3000";
const BASE2_URL = BASE_URL + "/test/";
// jest.setTimeout(10000); use --testTimeout=


async function listURLs(start, addParent=true) {
  let out = [];
  if (addParent) {
    start = path.join(__dirname, start);
  }

  let buf = fs.readdirSync(start);
  if (!Array.isArray(buf)) {
    console.error("what happened, no source? " + start);
    return [];
  }

  for (let i = 0; i < buf.length; i++) {
    if (!(buf[i].endsWith(".js") || buf[i].endsWith(".ts"))) {
      continue; // a.n.other file, don't load it
    }

console.log("befier require ", path.join(start, buf[i]) );
    let buf2;
	  try {	
		   buf2 = await import( path.join(start, buf[i]) );
//		buf2 = require(path.join(start, buf[i]));
	  }  catch(e) { console.log(buf[i] +" ERROR ", e); throw e; }

console.log( "a test with data "+buf[i], buf2 );

    if (!("myURLs" in buf2)) {
      console.error(
        "what happened, no myURLs func? " + path.join(start, buf[i])
      );
      return out;
    }
console.log( "a test "+buf[i], buf2.myURLs() );
    out.push(...buf2.myURLs());
  }
  return out;
}

function filterURLs(src) {
  let snk = [];
  for (let i = 0; i < src.length; i++) {
    if (src[i].indexOf("*") >= 0) {
      continue;
    }
    if (src[i] === "/test/cat/") {
      continue; // this is POST only API
    }

    let t = src[i];
    if (t.indexOf(":ID")) {
      t = t.replace(":ID", "1");
    }
    snk.push(t);
  }
  return snk;
}

test('tests assertions can count', async () => {
  await expect( delay2(1500) ).resolves.toEqual(true);
});

test('tests assertions can also count', async () => {
  expect.assertions(2);
  let ret=await delay2(1500);
  expect( ret ).toEqual(true);
  expect( ret ).toEqual(true);
//  expect( (new Promise("help")).resolve()  ).resolve.toEqual("help");
});

test('tests assertions can also count harder', (done) => {
	delay2(1500).
	then((a) => {
		expect( a ).toEqual(true);
		done();
  })
});


test("can I loop over each expected URL?", async () => {
  expect.assertions(2);
  let achieved = 0;
  let mustExist = await listURLs("../services/", true);
//  let mustExist = await listURLs("./inc/", true);

console.log("[102] a test loaded file ", mustExist);
  mustExist = await filterURLs(mustExist);
  expect.assertions( mustExist.length );
console.log("[104] a test loaded file ", mustExist);

  achieved = mustExist.length;
  for (let i = 0; i < mustExist.length; i++) {
    const myURL = BASE_URL + mustExist[i];
console.log("[110] a test "+i +"  "+ myURL, achieved);
    const err1 = (a, b) => {
      console.log(a, b);
      expect(500, "Invalid response [no logged URL]" + myURL).toBe(204);

console.log("the actual test ",a, b, i, achieved, mustExist[i]);
      achieved--; // decrement first, as Array.length is 1 too large
    };

    const pass1 = (statusCode, data, headers) => {
      if (headers) {
        headers = headers[0];
      }
      expect(statusCode, "Worked " + myURL).toBe(200);

console.log("the actual test ", statusCode,  i, achieved, mustExist[i]);
      achieved--; // decrement first, as Array.length is 1 too large
    };

    await doCurl_CB(myURL, pass1, err1);
console.log("[130] a test "+achieved );
    delay(500);
  }
console.log("[133] a test "+achieved );
});


