"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pqrs_1 = require("../../controllers/pqrs/pqrs");
const router = (0, express_1.Router)();
router.get('/', pqrs_1.getPQRSs);
router.get('/obtener/:id', pqrs_1.getPQRS);
router.get('/ultimo_pqrs/', pqrs_1.getLastPQRS);
router.post('/', pqrs_1.postPQRS);
router.put('/agregarImg/:id', pqrs_1.updatePQRSImage);
router.post('/guardarImg/', pqrs_1.upload.single('myFile'), (req, res) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    res.json({ data: 'Imagen Cargada', url: `http://${process.env.DB_HOST}:${process.env.PORT || 3001}/${file}` });
});
router.put('/actualizar/:id', pqrs_1.updatePQRS);
exports.default = router;
