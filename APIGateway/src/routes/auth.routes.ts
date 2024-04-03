// @ts-ignore
const controller = require("../controlleurs/auth.controller");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/signin", controller.signin);
    app.post("/signup", controller.signup);
};