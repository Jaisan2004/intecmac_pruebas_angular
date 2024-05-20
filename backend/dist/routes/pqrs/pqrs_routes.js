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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pqrs_plan_accion_1 = require("../../controllers/pqrs/pqrs_plan_accion");
const pqrs_producto_1 = require("../../controllers/pqrs/pqrs_producto");
const formsSelect_1 = require("../../controllers/formsSelect");
const router = (0, express_1.Router)();
//Pqrs productos
router.post('/pqrs_producto/', pqrs_producto_1.postPqrsProducto);
router.get('/pqrs_productos/:id', formsSelect_1.getInfoProducto);
router.get('/pqrs_producto/:id', pqrs_producto_1.getPqrsProducto);
router.put('/pqrs_producto/:id', pqrs_producto_1.updatePqrsProducto);
//Pqrs Planes de accion
router.get('/planes_accion/:id', pqrs_plan_accion_1.getPqrsPlanes);
router.post('/plan_accion/', pqrs_plan_accion_1.postPlanPqrs);
router.get('/plan_accion/:id', pqrs_plan_accion_1.getPlanPqrs);
router.put('/plan_accion/:id', pqrs_plan_accion_1.updatePlanPqrs);
router.post('/plan_accion_correo', function (req, res) {
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
        <b>Descripción del plan acción:</b> ${body.ppa_descripcion}<br><br>
        
        Se solicita amablemente que se realice este plan antes de la fecha de cumplimiento establecida: <b>${body.ppa_fecha_cumplimiento}.</b><br><br>

        Agradecemos su atención y compromiso con nuestro servicio.<br><br>

        Atentamente,<br><br>

        Planes de Acción PQRS<br>
        Intecma S.A.S`
        });
        res.status(200).json({ ok: true, message: "enviado" });
    });
});
exports.default = router;
