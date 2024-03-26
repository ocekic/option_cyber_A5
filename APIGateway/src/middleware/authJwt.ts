// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const dotenv = require("dotenv");
dotenv.config();
// @ts-ignore
const db = require("../models");
// @ts-ignore
const User = db.user;

const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "Aucun token fourni !" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).send({ message: "Utilisateur non trouvé" });
        }
        if (user.status === 1) {
            return res.status(401).send({ message: "Accès refusé : compte désactivé !" });
        }
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).send({ message: "Accès refusé : token invalide !" });
    }
};

module.exports = {
    verifyToken,
}
