// @ts-ignore
import { authJwt } from '../middleware';

const routes = [
    {
        url: '/users',
        middleware: [authJwt.verifyToken],
        proxy: {
            // Utilisez le nom du service tel que défini dans docker-compose.yml
            target: "http://users:9000", // Remplacez 127.0.0.1:9000 par users:9000
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
        middleware: [authJwt.verifyToken],
        proxy: {
            // Utilisez le nom du service pour le microservice correspondant
            target: "http://gestion-freezbe:8000", // Assurez-vous que c'est le bon port et nom de service pour votre microservice Freezbe
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = path.replace(/^\/freezbe/, '/');
                return newPath;
            }
        }
    },
];
