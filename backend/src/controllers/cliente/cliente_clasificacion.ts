import { Request, Response } from 'express'

import Cliente_Clasificacion from '../../models/cliente/cliente_clasificacion';

export const getClienteClasificaciones = async(req: Request, res: Response) => {
    const listClienteClasificacion = await Cliente_Clasificacion.findAll()

    res.json(listClienteClasificacion)
}

export const getPeoducto= async (req: Request, res: Response)=>{
    const {id} = req.params;
    const clienteClasificacion = await Cliente_Clasificacion.findByPk(id)

    if(clienteClasificacion){
        res.json(clienteClasificacion)
    }else{
        res.status(404).json({
            msg: 'No existe PQRS'
        })
    }
    
}