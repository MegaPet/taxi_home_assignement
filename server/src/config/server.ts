import express, {Express, Request, Response} from "express";
import db from "./db";
const cors = require('cors');

const port = 3000;
const server = express();

server.use(cors());
server.use(express.json());

const vehicles = require("../routes/route-vehicle");

server.use("/vehicles", vehicles);
 
server.listen(port, () => {
  console.log(`[ LISTENING ON PORT:\t${port}\t]\n`);
});