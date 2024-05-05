import path from "path";
import { fileURLToPath } from "node:url";
import { createRequire } from "module";

import { Curl } from "@getinsomnia/node-libcurl";

// name is due to the fact I may port to Promises or other async method
// this function predates modern versions of Node
export function doCurl_CB(url, good1, bad1, post) {
  try {

    const curl = new Curl();
console.log("the curl class ", curl.setOpt);
console.dir( curl);
    curl.setOpt("URL", url);
    curl.setOpt("FOLLOWLOCATION", true);
    curl.setOpt("VERBOSE", true);
    curl.setOpt("HTTPHEADER", [
      "upgrade-insecure-requests: 1",
      "cache-control: no-cache",
      "accept-language: en-GB,en;q=0.5",
      "user-agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:108.0) Gecko/20100101 Firefox/108.0",
    ]);
    if (post) {
   	  post = JSON.stringify(post);
      curl.setOpt(Curl.option.POST, true);
      curl.setOpt(Curl.option.POSTFIELDS, "data=" + post);
    }

    curl.on("end", good1.bind(curl));
    curl.on("error", bad1.bind(curl));
    curl.perform();
  } catch (e) {
    console.warn("[ERROR] Network error with " + url + " :: " + e);
    (bad1.bind(curl))(e, url);
	curl.close();
  }
}

export function createPaths(url) {
	const require = createRequire(url);
	const __filename = fileURLToPath(url);
	const __dirname = path.dirname(__filename);
	return [ __filename, __dirname ];
}

export function delay(ms) {
  return new Promise((good, bad) => setTimeout(good, ms));
}

export function delay2(ms) {
  return new Promise((good, bad) => {setTimeout(()=>{ return good(true); }, ms)} );
}



