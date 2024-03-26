"use strict";
// @ts-ignore
const controller = require("../controller/freezbe.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
router.get('/', controller.getAllFreezbes);
router.get('/:id', controller.getFreezbeById);
router.post('/', controller.createFreezbe);
router.patch('/:id', controller.updateFreezbe);
router.delete('/:id', controller.deleteFreezbe);
module.exports = router;
