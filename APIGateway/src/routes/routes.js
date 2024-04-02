"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const middleware_1 = require("../middleware");
const routes = [
    {
        url: '/users',
        middleware: [middleware_1.authJwt.verifyToken],
        proxy: {
            target: "http://users:9000",
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = path.replace(/^\/users/, '/');
                newPath = `${newPath.split('?')[0]}?userId=${req.userId}`;
                return newPath;
            }
        }
    },
    {
        url: '/freezbe',
        middleware: [middleware_1.authJwt.verifyToken],
        proxy: {
            target: "http://gestion-freezbe:8000",
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = path.replace(/^\/freezbe/, '/');
                return newPath;
            }
        }
    },
];
