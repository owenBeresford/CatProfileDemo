import path, { dirname} from "node:path";
import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
// IOIO TODO disabled as do not have time to argue with types now
// import { setUp as realAPI } from './services/v1';

import { setUp as testAPI } from "./services/test";
import { setUp as assetAPI } from "./services/assets";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @comment A bootstrap file to run a node API
 * Most work is delegated to ./services/* modules to make this easier to read
 */

const envFileName = `.env.${process.env.NODE_ENV}`;
const pathToEnvFile = path.resolve(__dirname, "..", envFileName);
dotenv.config({ path: pathToEnvFile });

process.env.IMPORTED_ENV = "1";

const app: Application = express();
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
assetAPI(app);

if (process.env.NODE_ENV === "production") {
  // IOIO TODO this module is disabled as do not have time to argue with types now
  //	realAPI(app);
} else {
  testAPI(app);
}

// IOIO TODO Add HTTPS
const port = process.env.SERVICE_PORT || 3000;
app.listen(port, () => {
  console.log(`Server [pid ${process.pid}] now listening on port: ${port} `);
});
