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
const User = require("../models/user.model");
const checkIfUserExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).send({
                message: "L'utilisateur n'existe pas",
            });
        }
        next();
    }
    catch (error) {
        res.status(500).send({
            message: "Erreur lors de la vérification de l'utilisateur",
        });
    }
});
// @ts-ignore
const checkData = {
    checkIfUserExist: checkIfUserExist,
};
module.exports = checkData;
