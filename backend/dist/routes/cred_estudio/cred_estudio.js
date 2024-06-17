"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cred_estudio_1 = require("../../controllers/cred_estudio/cred_estudio");
const router = (0, express_1.Router)();
router.get('/', cred_estudio_1.getCredEstudios);
router.get('/:id', cred_estudio_1.getCredEstudio);
router.post('/', cred_estudio_1.postCredEstudio);
router.post('/agregarPdf', cred_estudio_1.pdfCredEstudio.single('myfile'), cred_estudio_1.guardarPdf);
router.put('/:id', cred_estudio_1.updateCredEstudio);
exports.default = router;