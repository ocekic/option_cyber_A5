const express = require('express');
const router = express.Router();
const controller = require("../controllers/user.controller");
const middleware  = require("../middleware"); 

router.post("/createUser", controller.createUser);
router.patch("/updateUser/:username", controller.updateUser);
router.get("/getUser/:username", controller.getUser);
router.get("/getUsers", controller.getUsers);
router.delete("/deleteUser/:username", controller.deleteUser);

module.exports = router;
