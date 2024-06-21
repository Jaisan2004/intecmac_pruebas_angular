import { Request, Response } from "express";
import areaEmpresa from "../../models/cargos/area_empresa";

export const getAreasEmpresa = async(req: Request, res: Response)=>{
    try {
        const listAreasEmpresa = await areaEmpresa.findAll({
            order:[['area_emp_nombre','ASC']]
        });

        res.json(listAreasEmpresa);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer las areas de la empresa hable con soporte'
        })
    }
}