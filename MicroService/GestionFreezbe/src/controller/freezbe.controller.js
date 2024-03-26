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
const freezbe_model_1 = __importDefault(require("../models/freezbe.model"));
exports.createFreezbe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom, description, pUHT, gamme, ingredients, grammage } = req.body;
    const freezbe = new freezbe_model_1.default({
        nom,
        description,
        pUHT,
        gamme,
        ingredients,
        grammage
    });
    try {
        const savedFreezbe = yield freezbe.save();
        res.status(200).json(savedFreezbe);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deleteFreezbe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield freezbe_model_1.default.deleteOne({ _id: id });
        res.status(200).json({ message: "Freezbe deleted" });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getFreezbeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const freezbe = yield freezbe_model_1.default.findById(id);
        if (!freezbe) {
            res.status(404).json({ message: "Freezbe not found" });
            return;
        }
        res.status(200).json(freezbe);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getAllFreezbes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freezbes = yield freezbe_model_1.default.find();
        res.status(200).json(freezbes);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updateFreezbe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nom, description, pUHT, gamme, ingredients, grammage } = req.body;
    try {
        const updatedFreezbe = yield freezbe_model_1.default.findByIdAndUpdate(id, {
            nom,
            description,
            pUHT,
            gamme,
            ingredients,
            grammage
        }, { new: true });
        if (!updatedFreezbe) {
            res.status(404).json({ message: "Freezbe not found" });
            return;
        }
        res.status(200).json(updatedFreezbe);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
