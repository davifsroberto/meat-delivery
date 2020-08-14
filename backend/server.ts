import * as jsonServer from "json-server";
import * as Express from "express";

import * as fs from "fs";
import * as https from "https";

import { handleAuthentication } from "./auth";
import { handleAuthorization } from "./authz";

const server: Express.Application = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port: number = 3001;
const base = process.env.PWD;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use(jsonServer.bodyParser);

// middleware for login
server.post("/login", handleAuthentication);
server.use("/orders", handleAuthorization);

// Use default router
server.use(router);

const options = {
  cert: fs.readFileSync(`${base}/keys/cert.pem`),
  key: fs.readFileSync(`${base}/keys/key.pem`),
};

https.createServer(options, server).listen(port, () => {
  console.log(`JSON Server is running on https://localhost:${port}`);
});
