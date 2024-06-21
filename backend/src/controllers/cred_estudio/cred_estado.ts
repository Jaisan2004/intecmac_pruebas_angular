import { Request, Response } from "express";
import CredEstado from "../../models/cred_estudio/cred_estado";

export const getEstados = async(req:Request, res: Response)=>{
    try {
        const listEstado = await CredEstado.findAll();

        res.json(listEstado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los estados hable con soporte'
        });
    }
}