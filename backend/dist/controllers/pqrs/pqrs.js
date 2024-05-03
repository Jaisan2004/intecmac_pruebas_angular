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
exports.upload = exports.updatePQRSImage = exports.updatePQRS = exports.postPQRS = exports.getPQRS = exports.getPQRSs = void 0;
const pqrs_1 = __importDefault(require("../../models/pqrs/pqrs"));
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const multer_1 = __importDefault(require("multer"));
const getPQRSs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT pq.pqrs_id, pq.pqrs_fecha_recepcion, pq.cli_id, cli.cli_nombre, cli.cli_zona, cli.cli_asesor_nombre, pq.prod_id, pro.prod_descripcion, pq.pqrs_lote,' +
        'pq.pqrs_prod_cantidad, pq.pqrs_doc, pq.pqrs_evidencia,pq.pqrs_descripcion, pq.pqrs_analisis,pq.pqrs_analisis, pq.costo, pq.pqrs_causa_raiz_id, pcr.pcr_causa, pq.carg_id, carg.carg_nombre,' +
        ' pq.pt_id, pt.pt_tipologia, pq.pqrs_fecha_respuesta, pq.pqrs_dias_gestion, pq.pqrs_documento_cruce, pq.pqrs_estado, pe.pe_estado from pqrs pq' +
        ' join cliente cli on pq.cli_id = cli.cli_id JOIN productos pro on pro.prod_id=pq.prod_id JOIN pqrs_causa_raiz pcr on pcr.pcr_id = pq.pqrs_causa_raiz_id' +
        ' join cargos carg on carg.carg_id=pq.carg_id join pqrs_tipologia pt on pt.pt_id=pq.pt_id join pqrs_estado pe on pe.pe_id= pq.pqrs_estado ORDER BY pq.pqrs_id DESC;';
    const listPqrs = yield connection_1.default.query(query, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    res.json(listPqrs);
});
exports.getPQRSs = getPQRSs;
const getPQRS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pqrs = yield pqrs_1.default.findByPk(id);
    if (pqrs) {
        res.json(pqrs);
    }
    else {
        res.status(404).json({
            msg: 'No existe PQRS'
        });
    }
});
exports.getPQRS = getPQRS;
const postPQRS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield pqrs_1.default.create(body);
        res.json({
            msg: 'PRQS Agregados Exitosamente'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error hable con soporte'
        });
    }
});
exports.postPQRS = postPQRS;
const updatePQRS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const pqrs = yield pqrs_1.default.findByPk(id);
        if (pqrs) {
            pqrs.update(body);
            res.json({
                msg: 'El PQRS se actualizo exitosamente'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe el producto con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ha ocurrido un error hable con soporte'
        });
    }
});
exports.updatePQRS = updatePQRS;
const updatePQRSImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = req.body.filePath;
    const { id } = req.params;
    try {
        const pqrs = yield pqrs_1.default.findByPk(id);
        if (pqrs) {
            pqrs.update({ pqrs_evidencia: filePath }, {
                where: {
                    id: id,
                },
            });
            res.json({
                msg: 'El PQRS se actualizó exitosamente',
                filePath: filePath,
            });
        }
        else {
            res.status(404).json({
                msg: `No existe el producto con el id ${id}`,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ha ocurrido un error hable con soporte',
        });
    }
});
exports.updatePQRSImage = updatePQRSImage;
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const fileName = file.originalname;
        cb(null, `${fileName}`);
    },
    destination: function (req, file, cb) {
        cb(null, './src/public');
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
