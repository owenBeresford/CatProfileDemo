import express, { Request, Response, Application } from "express";
import { readFile } from "fs/promises";
import path, { dirname} from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 * myURLs
 * A function for testing that reports what this module 'does'/ is responsible for
 *
 * @public
 */
export function myURLs(): Array<string> {
  return [
    "/",
    "/favicon.ico",
    "/logo192.png",
    "/manifest.json",
    "/default-face.svg",
    "/robots.txt",
    "/asset-manifest.json",
    "/static/css/main*css",
    "/static/js/main*js",
  ];
}

/**
 * setUp()
 * This module is a the static assets, such as HTML files.   
 *   Note HTML docs are NOT LOADED via this file, but could be

 * @param {Application} app - the express engine to attach the API points to 
 * @public 
 */
export function setUp(app: Application): void {
  const buildDir = path.join(__dirname, "..", "build");
  app.use(express.static(buildDir));
  app.get("/", basic);
}

function basic(req: Request, res: Response): void {
  console.log("request for HTML", req.url);
  const buildDir = path.join(__dirname, "..", "build");
  res.sendFile(path.join(buildDir, "index.html"));
}
