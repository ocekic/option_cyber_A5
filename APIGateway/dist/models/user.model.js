"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
