import { Request, Response } from 'express'

import Cliente_Ciudad from '../../models/cliente/cliente_ciudad';

export const getClienteCiudades = async(req: Request, res: Response) => {

    try {
        const listClienteCiudad = await Cliente_Ciudad.findAll({
            order:[['c_c_nombre', 'ASC']]
        })
    
        res.json(listClienteCiudad)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer las ciudades'
        })
    }
}

export const getClienteCiudad = async(req:Request, res: Response)=>{
    const {id} = req.params;

    try {
        const ciudad = await Cliente_Ciudad.findByPk(id);
        if(ciudad){
            res.json(ciudad);
        }else{
            res.status(404).json({
                msg: `No exite ninguna ciudad con el id: ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer la ciudad hable con soporte'
        });
    }
}

export const postClienteCiudad = async (req:Request, res: Response)=>{
    const {body} = req;
    try {
        await Cliente_Ciudad.create(body);

        res.json({
            msg: `Ciudad ${body.c_c_nombre} creada exitosamente`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al crear la ciudad hable con soporte'
        });
    }
}

export const updateClienteCiudad = async (req:Request, res: Response)=>{
    const {id} = req.params;
    const {body} = req;

    try {
        const ciudad = await Cliente_Ciudad.findByPk(id);
        if(ciudad){
            ciudad.update(body);
            res.json({
                msg: `Ciudad: "${body.c_c_nombre}" modificada exitosamente`
            });
        }else{
            res.status(404).json({
                msg: `No existe una ciudad con el id: ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al editar la ciudad hable con soporte'
        });
    }
    
}
