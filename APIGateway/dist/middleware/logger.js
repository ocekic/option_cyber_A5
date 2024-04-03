"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const controller = require("../controlleurs/log.controller");
const login = (req, res, next) => {
    if (controller.createLog('login', req.userId)) {
        next();
    }
    else {
        return;
    }
};
const routeAccess = (req, res, next) => {
    controller.createLog(JSON.stringify({
        method: req.method,
        url: req.url,
        host: req.headers.host
    }), req.userId);
    next();
};
// @ts-ignore
exports.logger = {
    login: login,
    routeAccess: routeAccess
};
module.exports = exports.logger;
