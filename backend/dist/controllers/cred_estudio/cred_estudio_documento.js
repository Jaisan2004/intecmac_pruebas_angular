"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCredDocEstudio = exports.updateCredDocEstudio = exports.postCredDocEstudio = exports.getCredDocEstudio = exports.getCredDocByEstudio = void 0;
const cred_estudio_documento_1 = __importDefault(require("../../models/cred_estudio/cred_estudio_documento"));
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const getCredDocByEstudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = `SELECT ced.cred_estu_doc_id, ced.cred_doc_id, ced.cred_estu_doc_url, cd.cred_doc_nombre FROM cred_estudio_documento ced
     JOIN cred_documento cd ON ced.cred_doc_id = cd.cred_doc_id where ced.cred_estu_id = ${id} order by cd.cred_doc_nombre;`;
    try {
        const listCredDocumento = yield connection_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT
        });
        res.json(listCredDocumento);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los documentos hable con soporte'
        });
    }
});
exports.getCredDocByEstudio = getCredDocByEstudio;
const getCredDocEstudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const credDocumento = yield cred_estudio_documento_1.default.findByPk(id);
        if (credDocumento) {
            res.json(credDocumento);
        }
        else {
            res.status(404).json({
                msg: `No existe un documento para este estudio con el id: ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error en el servidor al traer el documento hable con soporte`
        });
    }
});
exports.getCredDocEstudio = getCredDocEstudio;
const postCredDocEstudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const documento = yield cred_estudio_documento_1.default.findAll({
            where: {
                cred_estu_doc_url: body.cred_estu_doc_url
            }
        });
        const nombre = body.cred_estu_doc_url.split('/').pop();
        if (documento && documento.length > 0) {
            res.status(400).json({
                msg: `Ya exite un documento: ${nombre}`
            });
        }
        else {
            yield cred_estudio_documento_1.default.create(body);
            res.json({
                msg: `El documento se registro exitosamente en el estudio de credito`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al registrar el documento en el estudio de credito'
        });
    }
});
exports.postCredDocEstudio = postCredDocEstudio;
const updateCredDocEstudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const credDocumento = yield cred_estudio_documento_1.default.findByPk(id);
        if (credDocumento) {
            credDocumento.update(body);
            res.json({
                msg: 'Documento actualizado exitosamente'
            });
        }
        else {
            res.status(404).json({
                msg: `No exite un documento con el "id: ${id}" en el estudio de credito`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al actualizar el documento hable con soporte'
        });
    }
});
exports.updateCredDocEstudio = updateCredDocEstudio;
const deleteCredDocEstudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const credDocumento = yield cred_estudio_documento_1.default.findByPk(id);
        if (credDocumento) {
            credDocumento.destroy();
            res.json({
                msg: `Se elimino exitosamente el documento del estudio de credito`
            });
        }
        else {
            res.status(404).json({
                msg: `No exite un documento con el "id: ${id}" en el estudio de credito`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al eliminar el documento hable con soporte'
        });
    }
});
exports.deleteCredDocEstudio = deleteCredDocEstudio;
