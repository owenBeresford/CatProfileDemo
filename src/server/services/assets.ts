import express ,{ Request, Response, Application } from "express";
import path from "path";
import { readFile } from "fs/promises";

/**
 * setUp()
 * This module is a the static assets, such as HTML files.   
 *   Note HTML docs are NOT LOADED via this file, but could be

 * @param app type Application: the express engine to attach the API points to 
 * @access public, and exported
 */
export function setUp(app: Application):void {

  const buildDir = path.join(process.cwd() + "/build");
  app.use(express.static(buildDir));
  app.get("/", function (req: Request, res: Response) {
    console.log("request for HTML", req.url);
    res.sendFile(path.join(buildDir, "index.html"));
  });
}
