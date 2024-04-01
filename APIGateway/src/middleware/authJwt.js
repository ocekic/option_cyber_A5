"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const dotenv = require("dotenv");
dotenv.config();
// @ts-ignore
const db = require("../models");
// @ts-ignore
const User = db.user;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "Aucun token fourni !" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = yield User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).send({ message: "Utilisateur non trouvé" });
        }
        if (user.status === 1) {
            return res.status(401).send({ message: "Accès refusé : compte désactivé !" });
        }
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(401).send({ message: "Accès refusé : token invalide !" });
    }
});
module.exports = {
    verifyToken,
};
