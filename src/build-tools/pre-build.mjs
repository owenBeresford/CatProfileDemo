import { readFile, writeFile, mkdir, copyFile, link } from "fs/promises";
import { constants, lstatSync, createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.join(__dirname, "..", "..", "build");
const PUBLIC_DIR = path.join(__dirname, "..", "..", "public");
const IN_FILE = path.join(BUILD_DIR, "index.html");
const FIXTURE_OUT_DIR = path.join(__dirname, "..", "..", "build", "fixtures");
const FIXTURE_IN_DIR = path.join(__dirname, "..", "server", "fixtures");
const ASSET_IN_DIR = path.join(__dirname, "..", "client", "asset");

let isDir = lstatSync(BUILD_DIR, { throwIfNoEntry: false });
if (!isDir) {
  await mkdir(BUILD_DIR).catch((ee) => {
    console.error("File mkdir error ", ee);
  }); // add abort?
}
isDir = lstatSync(PUBLIC_DIR, { throwIfNoEntry: false });
if (! isDir ) {
  await link(ASSET_IN_DIR, PUBLIC_DIR).catch((ee) => {
    console.error("File link error ", ee);
  }); // add abort?
}

console.log("Made symlinks");
