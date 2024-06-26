"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pqrs_1 = require("../controllers/pqrs/pqrs");
const router = (0, express_1.Router)();
router.get('/', pqrs_1.getPQRSs);
router.get('/:id', pqrs_1.getPQRS);
router.post('/', pqrs_1.postPQRS);
router.put('/:id', pqrs_1.updatePQRS);
exports.default = router;
