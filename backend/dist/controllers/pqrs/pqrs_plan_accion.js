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
exports.updatePlanPqrs = exports.postPlanPqrs = exports.getPlanPqrs = exports.getPqrsPlanes = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const pqrs_plan_accion_1 = __importDefault(require("../../models/pqrs/pqrs_plan_accion"));
const getPqrsPlanes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const query = 'SELECT ppa.ppa_id, ppa.ppa_fecha_inicio, ppa.ppa_descripcion, ppa.ppa_fecha_cumplimiento, ppa.carg_id, car.carg_nombre, ppa.ppa_observaciones,ppa.pqrs_id,' +
        ' pqrs.pqrs_descripcion, ppa_estado FROM pqrs_plan_accion ppa join cargos car ON car.carg_id = ppa.carg_id JOIN pqrs on ppa.pqrs_id = pqrs.pqrs_id WHERE pqrs.pqrs_id=' + id + ';';
    const listPqrsPlan = yield connection_1.default.query(query, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    res.json(listPqrsPlan);
});
exports.getPqrsPlanes = getPqrsPlanes;
const getPlanPqrs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const planPqrs = yield pqrs_plan_accion_1.default.findByPk(id);
    if (planPqrs) {
        res.json(planPqrs);
    }
    else {
        res.status(404).json({
            msg: 'No existe PQRS'
        });
    }
});
exports.getPlanPqrs = getPlanPqrs;
const postPlanPqrs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield pqrs_plan_accion_1.default.create(body);
        res.json({
            msg: 'Plan de accion Agregado Exitosamente'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error hable con soporte'
        });
    }
});
exports.postPlanPqrs = postPlanPqrs;
const updatePlanPqrs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const planPqrs = yield pqrs_plan_accion_1.default.findByPk(id);
        if (planPqrs) {
            planPqrs.update(body);
            res.json({
                msg: 'El Plan de accion se actualizo exitosamente'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe el plan de accion con el id ${id}`
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
exports.updatePlanPqrs = updatePlanPqrs;
