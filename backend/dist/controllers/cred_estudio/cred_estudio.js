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
exports.guardarPdf = exports.pdfCredEstudio = exports.updateCredEstudio = exports.postCredEstudio = exports.getLastCredEstu = exports.getCredEstudio = exports.getCredEstudios = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const cred_estudio_1 = __importDefault(require("../../models/cred_estudio/cred_estudio"));
const multer_1 = __importDefault(require("multer"));
const getCredEstudios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `WITH 
    fs AS (
        SELECT MAX(cee.cred_esta_estu_fecha) AS cred_esta_estu_fecha, cee.cred_estu_id
        FROM cred_estado_estudio cee
        WHERE cee.cred_esta_id = 1
        GROUP BY cee.cred_estu_id
    ),
    fvcom AS (
        SELECT MAX(cee.cred_esta_estu_fecha) AS cred_esta_estu_fecha, cee.cred_estu_id
        FROM cred_estado_estudio cee
        WHERE cee.cred_esta_id = 2
        GROUP BY cee.cred_estu_id
    ),
    fvcon AS (
        SELECT MAX(cee.cred_esta_estu_fecha) AS cred_esta_estu_fecha, cee.cred_estu_id
        FROM cred_estado_estudio cee
        WHERE cee.cred_esta_id = 3
        GROUP BY cee.cred_estu_id
    ),
    fvg AS (
        SELECT MAX(cee.cred_esta_estu_fecha) AS cred_esta_estu_fecha, cee.cred_estu_id
        FROM cred_estado_estudio cee
        WHERE cee.cred_esta_id = 4
        GROUP BY cee.cred_estu_id
    ),
    est AS (
        SELECT cee.cred_esta_estu_id, cee.cred_estu_id, ce.cred_esta_id,ce.cred_esta_nombre AS estado
        FROM cred_estado_estudio cee
        JOIN cred_estado ce ON cee.cred_esta_id = ce.cred_esta_id
        WHERE cee.cred_esta_estu_id IN (
            SELECT MAX(cee2.cred_esta_estu_id)
            FROM cred_estado_estudio cee2
            GROUP BY cee2.cred_estu_id
        )
    )
SELECT 
    ce.cred_estu_id,
    cli.cli_nombre, 
    ct.cred_tipo_nombre, 
    cli.cli_asesor_nombre, 
    ce.cred_obser_comercial, 
    ce.cred_cliente_desde,
    ce.cred_cupo_actual, 
    cli.cli_pp_sistema, 
    ce.cred_descuento_otorgado, 
    fs.cred_esta_estu_fecha AS fecha_solicitud, 
    fvcom.cred_esta_estu_fecha AS fecha_comercial,
    ce.cred_obser_dirComercial, 
    fvcon.cred_esta_estu_fecha AS fecha_contabilidad, 
    ce.cred_obser_contabilidad, 
    fvg.cred_esta_estu_fecha AS fecha_gerencia, 
    ce.cred_plazo_aprobado, 
    ce.cred_cupo_aprobado, 
    ce.cred_obser_gerencia, 
    est.cred_esta_id,
    est.estado
FROM 
    cred_estudio ce
JOIN 
    cliente cli ON ce.cli_id = cli.cli_id
JOIN 
    cred_tipo ct ON ce.cred_tipo_id = ct.cred_tipo_id
LEFT JOIN 
    fs ON fs.cred_estu_id = ce.cred_estu_id
LEFT JOIN 
    fvcom ON fvcom.cred_estu_id = ce.cred_estu_id
LEFT JOIN 
    fvcon ON fvcon.cred_estu_id = ce.cred_estu_id
LEFT JOIN 
	fvg ON fvg.cred_estu_id = ce.cred_estu_id
LEFT JOIN
	est on est.cred_estu_id = ce.cred_estu_id order by ce.cred_estu_id desc;`;
    try {
        const listCredEstudio = yield connection_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT
        });
        res.json(listCredEstudio);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer los estudios de creditos hable con soporte'
        });
    }
});
exports.getCredEstudios = getCredEstudios;
const getCredEstudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const credEstudio = yield cred_estudio_1.default.findByPk(id);
        if (credEstudio) {
            res.json(credEstudio);
        }
        else {
            res.status(404).json({
                msg: `No exite un estudio de credito con el id:${id}`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer el estudio de credito hable con soporte'
        });
    }
});
exports.getCredEstudio = getCredEstudio;
const getLastCredEstu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estudio = yield cred_estudio_1.default.findAll({ attributes: [[connection_1.default.fn('MAX', connection_1.default.col('cred_estu_id')), 'cred_estu_id']] });
    if (estudio) {
        res.json(estudio);
    }
    else {
        res.status(404).json({
            msg: 'No existe estudio de credito'
        });
    }
});
exports.getLastCredEstu = getLastCredEstu;
const postCredEstudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield cred_estudio_1.default.create(body);
        res.json({
            msg: `Se agrego el estudio de credito exitosamente`
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al crear un nuevo estudio de credito hable con soporte'
        });
    }
});
exports.postCredEstudio = postCredEstudio;
const updateCredEstudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const credEstudio = yield cred_estudio_1.default.findByPk(id);
        if (credEstudio) {
            credEstudio.update(body);
            res.json({
                msg: 'Se modifico el estudio de credito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un estudio de credito con el id: ${id}`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al editar el estudio de credito'
        });
    }
});
exports.updateCredEstudio = updateCredEstudio;
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const fileName = file.originalname;
        cb(null, `${fileName}`);
    },
    destination: function (req, file, cb) {
        cb(null, './src/public/credEstuPDFs');
    }
});
exports.pdfCredEstudio = (0, multer_1.default)({ storage });
const guardarPdf = (req, res) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    res.json({
        data: 'Archivo Cargado',
        url: `http://${process.env.DB_HOST}:${process.env.PORT || 3001}/credEstuPDFs/${file}`
    });
};
exports.guardarPdf = guardarPdf;
