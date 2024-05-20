"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cargoController_1 = require("../controllers/cargoController");
const router = (0, express_1.Router)();
router.get('/:id', cargoController_1.getCargo);
exports.default = router;
