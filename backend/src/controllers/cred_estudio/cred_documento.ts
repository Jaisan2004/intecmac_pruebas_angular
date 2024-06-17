import { Request, Response } from "express";
import CredDocumento from "../../models/cred_estudio/cred_documento";

export const getCredDocumentos = async(req: Request, res: Response)=>{
    try {
        const listCredDocumentos = await CredDocumento.findAll();

        res.json(listCredDocumentos);
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer los documentos hable con soporte'
        })
    }
}