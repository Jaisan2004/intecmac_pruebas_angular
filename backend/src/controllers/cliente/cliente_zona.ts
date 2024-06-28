import { Request, Response } from 'express'

import Cliente_Zona from '../../models/cliente/cliente_zona';

export const getClienteZonaCiudades = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const listClienteZona = await Cliente_Zona.findAll({
            where: { c_c_id: id }
        })

        res.json(listClienteZona)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al traer los barrios de la ciudad hable con soporte'
        });
    }
}

export const getClienteZona = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const zona = await Cliente_Zona.findByPk(id);
        if (zona) {
            res.json(zona);
        } else {
            res.status(404).json({
                msg: `No existe ningun barrio con el id: ${id}`
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor al traer el barrio hable con soporte'
        });
    }
}

export const postClienteZona = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Cliente_Zona.create(body);

        res.json({
            msg: `Barrio: "${body.cz_nombre}" creado exitosamente`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el barrio hable con soporte'
        });
    }
}

export const updateClienteZona = async (req:Request, res:Response)=>{
    const {id} = req.params;
    const {body} = req;

    try {
        const zona = await Cliente_Zona.findByPk(id);
        if(zona){
            zona.update(body);
            res.json({
                msg: `Barrio: ${body.cz_nombre} editado exitosamente`
            })
        }else{
            res.status(404).json({
                msg: `No existe un barrio con el id:${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al editar el barrio'
        });
    }
}