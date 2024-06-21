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
exports.correoCreaEstuCred = exports.correoPlan = exports.correoCreaPQRS = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const enviosCorreos = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});
//PQRS
//Envio de notificación de creacion de PQRS
const correoCreaPQRS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield enviosCorreos.sendMail({
            from: `Creacion Nuevas PQRS ${process.env.EMAIL}`,
            to: `${process.env.DIR_COMERCIAL}, ${process.env.ADMINISTRACION}, ${process.env.GERENCIA}`,
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
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al enviar el correo de creación PQRS hable con soporte'
        });
    }
});
exports.correoCreaPQRS = correoCreaPQRS;
//Correo de notificacion al cargo correspondiente Plan Mejors
const correoPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield enviosCorreos.sendMail({
            from: `Planes de Accion Comercial ${process.env.EMAIL}`,
            to: `${body.carg_correo}`,
            subject: `Plan de accion PQRS ${body.pqrs_id}`,
            html: `${body.saludos}, Estimad@ ${body.cargo}.<br><br>
    
            Este es un correo automático de <b>Intecma S.A.S.</b> para informarle que se le ha asignado un plan de <br> 
    
            acción para atender la <b>PQRS ${body.pqrs_id}</b> <br><br>
    
            A continuación, se proporcionan los detalles tanto de la PQRS y del plan de Acción:<br><br>
    
            <b>PQRS ${body.pqrs_id}</b>:<br><br>
    
            <b>Cliente:</b> ${body.cli_nombre}<br>
            <b>Descripción:</b> ${body.pqrs_descripcion}<br><br>
    
            <b>Plan de Acción:</b><br><br>
    
            <b>Fecha de creacion:</b> ${body.ppa_fecha_inicio}<br>
            <b>Fecha de cumplimiento:</b> ${body.ppa_fecha_cumplimiento}<br>
            <b>Descripción del plan acción:</b> ${body.ppa_descripcion}<br>
            <b>Observaciones del plan acción:</b> ${body.ppa_observaciones}<br><br>
            
            Se solicita amablemente que se realice este plan antes de la fecha de cumplimiento establecida: <b>${body.ppa_fecha_cumplimiento}.</b><br><br>
    
            Para ver el <b>Plan de Acción de la PQRS ${body.pqrs_id}</b> ingrese al siguiente link <a href="${process.env.URL_PLAN_PQRS}${body.pqrs_id}">Plan de Acción PQRS ${body.pqrs_id}</a><br><br>
    
            Agradecemos su atención y compromiso con nuestro servicio.<br><br>
    
            Atentamente,<br><br>
    
            Planes de Acción PQRS<br>
            Intecma S.A.S`
        });
        res.status(200).json({ ok: true, message: "enviado" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al enviar el correo de notificacion plan de mejora hable con soporte'
        });
    }
});
exports.correoPlan = correoPlan;
const correoCreaEstuCred = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield enviosCorreos.sendMail({
            from: `Creación Estudio Crédito ${process.env.EMAIL}`,
            to: `${body.carg_correo}`,
            subject: `Notificacion de Estudio de Crédito #${body.cred_estu_id} Creado`,
            html: `${body.saludos}, Estimad@ ${body.cargo}.<br><br>
    
            Este es un correo automático de <b>Intecma S.A.S.</b> para informarle que creo exitosamente el <b>Estudio de Crédito</b> <br>
            El día: ${body.cred_fecha_creacion} a la hora: ${body.hora_creacion} 
    
            Recuerde que todavia falta adjuntar los archivos para que el <b>Estudio de Crédito</b> pueda avanzar al siguiente cargo correspondiente <br><br>
    
            Para ver el <b>Estudio de Crédito</b> ingrese al siguiente link <a href="${process.env.URL_ESTUDIO_CREDITO}${body.cred_estu_id}">Estudio de Crédito</a><br><br>
    
            Agradecemos su atención y compromiso con nuestro servicio.<br><br>
    
            Atentamente,<br><br>
    
            Planes de Acción PQRS<br>
            Intecma S.A.S`
        });
        res.status(200).json({ ok: true, message: "enviado" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al enviar el correo de notificacion Estudio de Crédito hable con soporte'
        });
    }
});
exports.correoCreaEstuCred = correoCreaEstuCred;
