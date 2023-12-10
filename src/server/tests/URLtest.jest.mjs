"use strict";
import jest from "jest";
import { Curl } from "node-libcurl";
import fs from "fs";
import path from "path";

import { createRequire } from "module";
const THIS_FILE = import.meta.url;
const require = createRequire(THIS_FILE);
// code necessary to know location of file
import { fileURLToPath } from "url";

const __filename = fileURLToPath(THIS_FILE);
const __dirname = path.dirname(__filename);
// e-o-block

const BASE_URL = "http://192.168.0.34:3000";
const BASE2_URL = BASE_URL + "/test/";
// jest.setTimeout(10000);

function delay(ms) {
  return new Promise((good, bad) => setTimeout(good, ms));
}

// function imported from my other source code.
// if I do this alot, I will pull it out, into a library
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
      curl.setOpt(Curl.option.POSTFIELDS, post);
    }

    curl.on("end", good1.bind(curl));
    curl.on("error", bad1.bind(curl));
    curl.perform();
  } catch (e) {
    console.warn("[ERROR] Network error with " + url + " :: " + e);
    bad1(e, url);
  }
}

function listURLs(start, addParent) {
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

    let buf2 = require(path.join(start, buf[i]));
    if (!"myURLs" in buf2) {
      console.error(
        "what happened, no myURLs func? " + path.join(start, buf[i])
      );
      return out;
    }
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

test("can I loop over each expected URL?", (done) => {
  let achieved = 0;

  let mustExist = listURLs("../services/", true);
  mustExist = filterURLs(mustExist);

  achieved = mustExist.length;
  for (let i = 0; i < mustExist.length; i++) {
    const myURL = BASE_URL + mustExist[i];
    const err1 = (a, b) => {
      console.log(a, b);
      expect(500, "Invalid response [no logged URL]" + myURL).toBe(204);

      achieved--; // decrement first, as Array.length is 1 too large
      if (achieved === 0) {
        done();
      }
    };

    const pass1 = (statusCode, data, headers) => {
      if (headers) {
        headers = headers[0];
      }
      expect(statusCode, "Worked " + myURL).toBe(200);

      achieved--; // decrement first, as Array.length is 1 too large
      if (achieved === 0) {
        done();
      }
    };

    wave(myURL, pass1, err1);
    delay(1000);
  }
});
