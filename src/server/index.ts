import express, { Request,Response, Application } from "express";
import bodyParser from "body-parser";
import path from "path";
import { Athlete, KeysOfAthlete, isAthlete } from './types/Athlete';
// IOIO TODO disabled as do not have time to argue with types now
// import { setUp as realAPI } from './services/v1';
import { setUp as testAPI } from './services/test';

/**
 * A bootstrap file to run a node API
 * Most work is delegated to ./services/* modules to make this easier to read
 */

const envFileName = `.env.${process.env.NODE_ENV}`;
const pathToEnvFile = path.resolve(__dirname, '..', envFileName);
require('dotenv').config({ path: pathToEnvFile });

process.env.IMPORTED_ENV='1';

const app:Application = express();
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// minimal handling for client side assets
// TODO IOIO pullout static files into own module, like test.ts
const buildDir = path.join(process.cwd() + "/build");
app.use(express.static(buildDir));
app.get("/", function (req:Request, res:Response) {
  console.log("request for HTML", req.url, req.path); 
  res.sendFile(path.join(buildDir, "index.html"));
});
// end

if(process.env.NODE_ENV === 'production') {
// IOIO TODO disabled as do not have time to argue with types now
//	realAPI(app);
} else {
	testAPI(app);
}

// IOIO TODO Add HTTPS
const port = process.env.SERVICE_PORT;
app.listen(port, () => {
   console.log(`Server now listening on port: ${port}`);
});
