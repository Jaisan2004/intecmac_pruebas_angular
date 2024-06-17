import { Request, Response } from "express";
import CredTipo from "../../models/cred_estudio/cred_tipo";
import multer from "multer";


export const getCredTipos = async (req: Request, res: Response)=>{
    try {
        const listCredTipos = await CredTipo.findAll();

        res.json(listCredTipos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los tipos de creditos hable con soporte'
        });
    }
}

