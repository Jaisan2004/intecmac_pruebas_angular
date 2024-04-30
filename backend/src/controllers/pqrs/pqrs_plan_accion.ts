import { Request, Response } from 'express'
import Pqrs from '../../models/pqrs/pqrs'
import sequelize from '../../db/connection';
import { QueryTypes } from 'sequelize';

export const getPqrsPlan = async (req: Request, res: Response) => {

    const id = req.params.id;

    const query = 'SELECT ppa.ppa_id, ppa.ppa_fecha_inicio, ppa.ppa_descripcion, ppa.ppa_fecha_cumplimiento, ppa.carg_id, car.carg_nombre, ppa.pqrs_id,'+ 
    ' pqrs.pqrs_descripcion FROM pqrs_plan_accion ppa join cargos car ON car.carg_id = ppa.carg_id JOIN pqrs on ppa.pqrs_id = pqrs.pqrs_id WHERE pqrs.pqrs_id='+id+';';

    const listPqrsPlan = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });

    res.json(listPqrsPlan)
}

export const getPQRS = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pqrs = await Pqrs.findByPk(id)

    if (pqrs) {
        res.json(pqrs)
    } else {
        res.status(404).json({
            msg: 'No existe PQRS'
        })
    }

}

export const postPQRS = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Pqrs.create(body);

        res.json({
            msg: 'PRQS Agregados Exitosamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error hable con soporte'
        })

    }


}

export const updatePQRS = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;


    try {
        const pqrs = await Pqrs.findByPk(id)
        if (pqrs) {
            pqrs.update(body);
            res.json({
                msg: 'El PQRS se actualizo exitosamente'
            })
        } else {
            res.status(404).json({
                msg: `No existe el producto con el id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ha ocurrido un error hable con soporte'
        })

    }

}