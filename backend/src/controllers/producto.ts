import { Request, Response } from 'express'

import Producto from '../models/producto';

export const getProductos = async(req: Request, res: Response) => {
    const listProducto = await Producto.findAll()

    res.json(listProducto)
}

export const getPeoducto= async (req: Request, res: Response)=>{
    const {id} = req.params;
    const pqrs = await Producto.findByPk(id)

    if(pqrs){
        res.json(pqrs)
    }else{
        res.status(404).json({
            msg: 'No existe PQRS'
        })
    }
    
}