import { readFile, writeFile, mkdir, copyFile } from "fs/promises";
import { constants, lstatSync, createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.join(__dirname, "..", "..", "build");
const IN_FILE = path.join(BUILD_DIR, "index.html");
const FIXTURE_OUT_DIR = path.join(__dirname, "..", "..", "build", "fixtures");
const FIXTURE_IN_DIR = path.join(__dirname, "..", "server", "fixtures");
const ASSET_IN_DIR = path.join(__dirname, "..", "client", "asset");

const isDir = lstatSync(FIXTURE_OUT_DIR, { throwIfNoEntry: false });
if (!isDir) {
  await mkdir(FIXTURE_OUT_DIR).catch((ee) => {
    console.error("File mkdir error ", ee);
  }); // add abort?
}
await copyFile(
  path.join(FIXTURE_IN_DIR, "all-cats.json"),
  path.join(FIXTURE_OUT_DIR, "all-cats.json"),
  constants.COPYFILE_FICLONE
).catch((ee) => {
  console.error("File copy error ", ee);
}); // add abort?
await copyFile(
  path.join(FIXTURE_IN_DIR, "single-cat.json"),
  path.join(FIXTURE_OUT_DIR, "single-cat.json"),
  constants.COPYFILE_FICLONE
).catch((ee) => {
  console.error("File copy error ", ee);
}); // add abort?
await copyFile(
  path.join(ASSET_IN_DIR, "default-face.svg"),
  path.join(BUILD_DIR, "default-face.svg"),
  constants.COPYFILE_FICLONE
).catch((ee) => {
  console.error("File copy error ", ee);
}); // add abort?

console.log("Copied fixtures");
