"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cred_estado_estudio_1 = require("../../controllers/cred_estudio/cred_estado_estudio");
const cred_tipo_1 = require("../../controllers/cred_estudio/cred_tipo");
const cred_documento_1 = require("../../controllers/cred_estudio/cred_documento");
const cred_estudio_documento_1 = require("../../controllers/cred_estudio/cred_estudio_documento");
const cred_estudio_1 = require("../../controllers/cred_estudio/cred_estudio");
const router = (0, express_1.Router)();
//ultimo estudio de credito
router.get('/ultimo_estudio', cred_estudio_1.getLastCredEstu);
//Estado del credito
router.get('/cred_estado_estudio/:id', cred_estado_estudio_1.getEstadosByEstudio);
router.post('/cred_estado_estudio/', cred_estado_estudio_1.postEstadoEstudio);
//Documentos de estudios de credito
router.get('/cred_documento', cred_documento_1.getCredDocumentos);
//Documentos del estudio de credito en especifico
router.get('/cre_estu_documentos/:id', cred_estudio_documento_1.getCredDocByEstudio);
router.get('/cred_estu_documento/:id', cred_estudio_documento_1.getCredDocEstudio);
router.post('/cred_estu_documento', cred_estudio_documento_1.postCredDocEstudio);
router.put('/cred_estu_documento/:id', cred_estudio_documento_1.updateCredDocEstudio);
router.delete('/cred_estu_documento', cred_estudio_documento_1.deleteCredDocEstudio);
//Tipo de estudios de creditos
router.get('/cred_tipo', cred_tipo_1.getCredTipos);
exports.default = router;
