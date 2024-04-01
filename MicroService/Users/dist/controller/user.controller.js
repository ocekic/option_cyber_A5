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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const user_model_1 = __importDefault(require("../../src/models/user.model"));
// @ts-ignore
const bcrypt = require('bcryptjs');
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.create({
            password: bcrypt.hashSync(req.body.password, 8),
            nom: req.body.surname,
            prenom: req.body.name,
            username: req.body.username,
        });
        res.status(200).send({ message: "Utilisateur créé", utilisateur: user });
    }
    catch (err) {
        if (err.code === 11000) {
            res.status(400).send({ erreur: "Une erreur est survenue durant l'enregistrement de l'utilisateur crée." });
        }
        else {
            res.status(500).send({ erreur: err.message });
        }
    }
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_model_1.default.findOneAndUpdate({ username: req.params.username }, {
            $set: {
                nom: req.body.name,
                prenom: req.body.surname,
                // Assurez-vous que la mise à jour du username est appropriée selon votre logique d'application
                // username: req.body.username,
            }
        }, { new: true });
        if (updatedUser) {
            res.status(200).send(updatedUser);
        }
        else {
            res.status(404).send({ message: "Utilisateur non trouvé" });
        }
    }
    catch (err) {
        res.status(500).send({ erreur: err.message });
    }
});
exports.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ username: req.params.username });
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send("Utilisateur non trouvé");
        }
    }
    catch (err) {
        res.status(500).send({ erreur: err.message });
    }
});
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({});
        res.status(200).send(users);
    }
    catch (err) {
        res.status(500).send({ erreur: err.message });
    }
});
exports.searchForUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({
            // Vous pouvez utiliser la syntaxe de requête MongoDB pour filtrer les utilisateurs
            // Exemple de recherche insensible à la casse pour 'nom'
            nom: { $regex: req.query.name, $options: 'i' },
            prenom: { $regex: req.query.surname, $options: 'i' },
            username: { $regex: req.query.email, $options: 'i' },
        });
        if (users.length > 0) {
            res.status(200).send(users);
        }
        else {
            res.status(404).send("Aucun utilisateur trouvé");
        }
    }
    catch (err) {
        res.status(500).send({ erreur: err.message });
    }
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_model_1.default.findOneAndDelete({ username: req.params.username });
        if (deletedUser) {
            res.status(200).send({ message: "Utilisateur supprimé" });
        }
        else {
            res.status(404).send("Utilisateur non trouvé");
        }
    }
    catch (err) {
        res.status(500).send({ erreur: err.message });
    }
});
