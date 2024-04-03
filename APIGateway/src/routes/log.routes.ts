// @ts-ignore
const controller = require("../controllers/log.controller");
// @ts-ignore
const {authJwt} = require("../middleware");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/getLogs", authJwt.verifyToken, authJwt.isAdmin, controller.getLogs);
    app.get("/getLogsByUser/:id", authJwt.verifyToken, authJwt.isAdmin, controller.getLogsByUser);
    app.get("/getlast100LogsByUser/:id", authJwt.verifyToken, authJwt.isAdmin, controller.getlast100LogsByUser);
    app.get("/getLastLogin/:id", authJwt.verifyToken, authJwt.isAdmin, controller.getLastLogin);
};