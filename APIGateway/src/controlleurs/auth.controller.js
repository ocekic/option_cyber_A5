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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// @ts-ignore
const db = require("../models");
// @ts-ignore
const User = db.User;
// @ts-ignore
const dotenv = require("dotenv");
dotenv.config();
// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const bcrypt = require("bcryptjs");
// @ts-ignore
const fetch = require("node-fetch");
exports.signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Remplacer par l'URL de ton microservice utilisateur
        const serviceUrl = 'http://127.0.0.1:3000/users/getUser/' + encodeURIComponent(req.body.username);
        const userServiceResponse = yield fetch(serviceUrl, {
            method: 'GET', // Supposant que la méthode est GET pour récupérer l'utilisateur
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const user = yield userServiceResponse.json();
        if (!userServiceResponse.ok) {
            return res.status(userServiceResponse.status).send("Utilisateur non trouvé");
        }
        // Vérifiez si le mot de passe est correct
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Mot de passe incorrect."
            });
        }
        // Générez un token JWT si l'authentification est réussie
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: 86400 // 24 heures
        });
        // Envoyez la réponse avec les détails de l'utilisateur et le token JWT
        res.status(200).send({
            id: user.id,
            username: user.username,
            accessToken: token
        });
    }
    catch (err) {
        res.status(500).send({ erreur: err.message });
    }
});
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Notez l'inversion des champs nom et prenom par rapport à votre exemple
        const user = new User({
            nom: req.body.name, // Correspond à 'name' dans le corps de la requête
            prenom: req.body.surname, // Correspond à 'surname' dans le corps de la requête
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8), // Hash du mot de passe
        });
        yield user.save(); // Sauvegardez l'utilisateur dans la base de données
        // Excluez le mot de passe de la réponse pour des raisons de sécurité
        const _a = user._doc, { password } = _a, userInfo = __rest(_a, ["password"]);
        res.status(200).send({
            message: "Utilisateur créé avec succès !",
            utilisateur: userInfo
        });
    }
    catch (err) {
        if (err.code === 11000) {
            // Gestion spécifique des erreurs de duplication (contrainte unique violée)
            res.status(400).send({ erreur: "Le nom d'utilisateur est déjà utilisé." });
        }
        else {
            res.status(500).send({ erreur: "Une erreur est survenue durant l'enregistrement de l'utilisateur." });
        }
    }
});
