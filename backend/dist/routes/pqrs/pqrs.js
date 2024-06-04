"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pqrs_1 = require("../../controllers/pqrs/pqrs");
const validad_token_1 = __importDefault(require("../validad_token"));
const router = (0, express_1.Router)();
router.get('/', validad_token_1.default, pqrs_1.getPQRSs);
router.get('/obtener/:id', validad_token_1.default, pqrs_1.getPQRS);
router.get('/ultimo_pqrs/', validad_token_1.default, pqrs_1.getLastPQRS);
router.post('/', validad_token_1.default, pqrs_1.postPQRS);
router.put('/agregarImg/:id', validad_token_1.default, pqrs_1.updatePQRSImage);
router.post('/guardarImg/', validad_token_1.default, pqrs_1.upload.single('myFile'), (req, res) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    res.json({ data: 'Imagen Cargada', url: `http://${process.env.DB_HOST}:${process.env.PORT || 3001}/${file}` });
});
router.put('/actualizar/:id', pqrs_1.updatePQRS);
exports.default = router;
