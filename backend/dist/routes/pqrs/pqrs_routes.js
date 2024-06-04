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
const express_1 = require("express");
const pqrs_plan_accion_1 = require("../../controllers/pqrs/pqrs_plan_accion");
const pqrs_producto_1 = require("../../controllers/pqrs/pqrs_producto");
const formsSelect_1 = require("../../controllers/formsSelect");
const validad_token_1 = __importDefault(require("../validad_token"));
const router = (0, express_1.Router)();
//Pqrs productos
router.post('/pqrs_producto/', validad_token_1.default, pqrs_producto_1.postPqrsProducto);
router.get('/pqrs_productos/:id', validad_token_1.default, formsSelect_1.getInfoProducto);
router.get('/pqrs_producto/:id', validad_token_1.default, pqrs_producto_1.getPqrsProducto);
router.put('/pqrs_producto/:id', validad_token_1.default, pqrs_producto_1.updatePqrsProducto);
//Pqrs Planes de accion
router.get('/planes_accion/:id', validad_token_1.default, pqrs_plan_accion_1.getPqrsPlanes);
router.post('/plan_accion/', validad_token_1.default, pqrs_plan_accion_1.postPlanPqrs);
router.get('/plan_accion/:id', validad_token_1.default, pqrs_plan_accion_1.getPlanPqrs);
router.put('/plan_accion/:id', validad_token_1.default, pqrs_plan_accion_1.updatePlanPqrs);
router.post('/plan_accion_correo', validad_token_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        yield pqrs_plan_accion_1.envioCorreoPlan.sendMail({
            from: `Planes de Accion Comercial ${process.env.EMAIL}`,
            to: `${body.carg_correo}`,
            subject: `Plan de accion PQRS ${body.pqrs_id}`,
            html: `${body.saludos}, Estimad@ ${body.cargo}.<br><br>

        Este es un correo automático de <b>Intecma S.A.S.</b> para informarle que se le ha asignado un plan de <br> 

        acción para atender la <b>PQRS ${body.pqrs_id}</b> <br><br>

        A continuación, se proporcionan los detalles del plan de acción:<br><br>

        <b>Fecha de creacion:</b> ${body.ppa_fecha_inicio}<br>
        <b>Fecha de cumplimiento:</b> ${body.ppa_fecha_cumplimiento}<br>
        <b>Descripción del plan acción:</b> ${body.ppa_descripcion}<br>
        <b>Observaciones del plan acción:</b> ${body.ppa_observaciones}<br><br>
        
        Se solicita amablemente que se realice este plan antes de la fecha de cumplimiento establecida: <b>${body.ppa_fecha_cumplimiento}.</b><br><br>

        Agradecemos su atención y compromiso con nuestro servicio.<br><br>

        Atentamente,<br><br>

        Planes de Acción PQRS<br>
        Intecma S.A.S`
        });
        res.status(200).json({ ok: true, message: "enviado" });
    });
});
router.post('/pqrs_creada', validad_token_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        yield pqrs_plan_accion_1.envioCorreoPlan.sendMail({
            from: `Creacion Nuevas PQRS ${process.env.EMAIL}`,
            to: `${process.env.DIR_COMERCIAL}, ${process.env.ADMINISTRACION}`,
            subject: `Creacion de la PQRS ${body.pqrs_id}`,
            html: `${body.saludos}.<br><br>

        Este es un correo automático de <b>Intecma S.A.S.</b> para informarle que se ha creado la <b>PQRS ${body.pqrs_id}</b> <br><br>

        A continuación, se proporcionan los detalles de la <b>PQRS ${body.pqrs_id}</b>:<br><br>

        <b>Fecha Recepción:</b> ${body.pqrs_fecha_recepcion}<br>
        <b>Cliente de la PQRS:</b> ${body.cli_nombre}<br>
        <b>Zona del Cliente:</b> ${body.cli_zona}<br>
        <b>Asesor del Cliente:</b> ${body.cli_asesor}<br>
        <b>Documento de la PQRS:</b> ${body.pqrs_doc}<br>
        <b>Descripción:</b> ${body.pqrs_descripcion}<br><br>
        
        Para mas información de la <b>PQRS ${body.pqrs_id}</b> ingrese al siguiente link <a href="${process.env.URL_PQRS}">PQRS Intecma</a><br><br>

        Agradecemos su atención y compromiso con nuestro servicio.<br><br>

        Atentamente,<br><br>

        Planes de Acción PQRS<br>
        Intecma S.A.S`
        });
        res.status(200).json({ ok: true, message: "enviado" });
    });
});
exports.default = router;
