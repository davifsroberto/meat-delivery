"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var server = jsonServer.create();
var router = jsonServer.router("db.json");
var middlewares = jsonServer.defaults();
var port = 3001;
var base = process.env.PWD;
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(jsonServer.bodyParser);
// middleware for login
server.post("/login", auth_1.handleAuthentication);
server.use("/orders", authz_1.handleAuthorization);
// Use default router
server.use(router);
var options = {
    cert: fs.readFileSync(base + "/keys/cert.pem"),
    key: fs.readFileSync(base + "/keys/key.pem")
};
https.createServer(options, server).listen(port, function () {
    console.log("JSON Server is running on https://localhost:" + port);
});
