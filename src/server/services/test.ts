import { Request, Response, Application } from "express";
// import { Cat, KeysOfCat, isCat } from '../types/Cat';
import { isCat } from "../types/Cat";
import path from "path";
import { readFile } from "fs/promises";

/**
 * exportsetUp
 * This module is a test implementation of an API, so the FE code can be tested
 * Note: API points are inert when NODE_ENV isn't development 

 * @author owen beresford
 * @param app type Application: the express engine to attach the API points to 
 * @access public, and exported
 * @return void
 */
export function setUp(app: Application) {
  app.get("/test/cat/all", getAll);
  app.get("/test/cat/:ID", getSingle);
  app.post("/test/cat/", postSingle);
  app.patch("/test/cat/:ID", patchSingle);
}

/**
 * getAll
 * API to return the current cats
 
 * @param req an Express Request
 * @param res an Express Response
 * @access module 
 * @return void
 */
async function getAll(req: Request, res: Response) {
  if (process.env.NODE_ENV !== "development") {
    res.status(404);
    return;
  }

  const FILE = path.join(__dirname, "fixtures", "all-cats.json");
  await readFile(FILE, { encoding: "utf8" })
    .then((json) => {
      res.status(200).json(JSON.parse(json));
    })
    .catch((err) => {
      console.warn("WARNING: " + err);
      res.status(404).send("Not found.");
    });
}

/**
 * asyncgetSingle
 * API to return a singular profile.  As this is for testing, it includes a 10% chance of failure
 
 * @param req an Express Request
 * @param res an Express Response
 * @access module
 * @return void
 */
async function getSingle(req: Request, res: Response) {
  if (process.env.NODE_ENV !== "development") {
    res.status(404);
    return;
  }

  console.log("recieved GET single cat data with id " + req.params.ID);
  if (Math.random() > 0.9) {
    res.status(404).send("The 10% random fail hit this request");
    return;
  }

  const FILE = path.join(__dirname, "fixtures", "single-cat.json");
  await readFile(FILE, { encoding: "utf8" })
    .then((json) => {
      res.status(200).json(JSON.parse(json));
    })
    .catch((err) => {
      console.warn("WARNING: " + err + " " + FILE);
      res.status(404).send("Not found.");
    });
}

/**
 * postSingle
 * API to store a profile. Nothing actually written to disk.  As this is for testing, it includes a 10% chance of failure
 *
 * @param req an Express Request
 * @param res an Express Response
 * @access module
 * @return void
 */
function postSingle(req: Request, res: Response) {
  if (process.env.NODE_ENV !== "development") {
    res.status(404);
    return;
  }
  if (!req.body.data) {
    res.status(400).send("Bad data for a cat");
    return;
  }
  // i do not know why this Express library cannot unpack these
  // or why Node string lacks replaceAll until v15
  let tt = ("" + req.body.data)
    .replace(/\\"/g, '"')
    .replace('"{', "{")
    .replace('}"', "}");

  tt = JSON.parse(tt);
  if (isCat(tt)) {
    if (Math.random() > 0.9) {
      res.status(500).send("The 10% random fail hit this request");
      return;
    } else {
      res.status(204).send("Made new Cat.");
    }
  } else {
    res.status(400).send("Bad data for a cat");
  }
}

/**
 * patchSingle
 * API to modify a profile. Nothing written to disk.  As this is for testing, it includes a 10% chance of failure
 *
 * @param req an Express Request
 * @param res an Express Response
 * @access module
 * @return void
 */
function patchSingle(req: Request, res: Response) {
  if (process.env.NODE_ENV !== "development") {
    res.status(404);
    return;
  }
  console.log("recieved PATCH data for " + req.params.ID);

  try {
    const tt = JSON.parse(req.body as string);
    if (isCat(tt)) {
      if (Math.random() > 0.9) {
        res.status(500).send("The 10% random fail hit this request");
        return;
      } else {
        res.status(202).send("Updated Cat.");
      }
    } else {
      res.status(400).send("Bad data for a cat");
    }
  } catch (e) {
    res.status(400).send("Bad data for a cat");
  }
}
