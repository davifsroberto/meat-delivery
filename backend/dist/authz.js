"use strict";
exports.__esModule = true;
exports.handleAuthorization = void 0;
var jwt = require("jsonwebtoken");
exports.handleAuthorization = function (req, resp, next) {
    var token = extractToken(req);
    if (!token) {
        resp.setHeader("WWW-Authenticate", 'Bearer token_type="JWT"');
        resp.status(401).json({ message: "Você precisa se autenticar" });
    }
    else {
        jwt.verify(token, "meat-api-password", function (error, decoded) {
            if (decoded) {
                next();
            }
            else {
                resp.status(403).json({ message: "Não autorizado." });
            }
        });
    }
};
function extractToken(req) {
    var token = undefined;
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(" ");
        if (parts.length === 2 && parts[0] === "Bearer") {
            token = parts[1];
        }
    }
    return token;
}
