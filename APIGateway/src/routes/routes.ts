// @ts-ignore
import {authJwt} from '../middleware';

const routes = [
    {
        url: '/users',
        middleware: [authJwt.verifyToken],
        proxy: {
            target: "http://127.0.0.1:3000",
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                let newPath = path.replace(/^\/users/, '/');
                newPath = `${newPath.split('?')[0]}?userId=${req.userId}`;
                return newPath;
            }
        }
    },
    {
        url: '/freezbe',
        middleware: [authJwt.verifyToken],
        proxy: {
            target: "http://127.0.0.1:7000",
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                let newPath = path.replace(/^\/freezbe/, '/');
                return newPath;
            }
        }
    },
]