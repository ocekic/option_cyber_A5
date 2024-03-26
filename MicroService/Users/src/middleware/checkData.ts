
const User = require("../models/user.model");

const checkIfUserExist = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).send({
                message: "L'utilisateur n'existe pas",
            });
        }
        next();
    } catch (error) {
   
        res.status(500).send({
            message: "Erreur lors de la vérification de l'utilisateur",
        });
    }
};

// @ts-ignore
const checkData = {
    checkIfUserExist : checkIfUserExist,
}

module.exports = checkData;