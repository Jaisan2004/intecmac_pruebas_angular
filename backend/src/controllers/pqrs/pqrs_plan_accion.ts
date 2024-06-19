import { Request, Response, text } from 'express'
import sequelize from '../../db/connection';
import { QueryTypes } from 'sequelize';
import PlanPqrs from '../../models/pqrs/pqrs_plan_accion';

export const getPqrsPlanes = async (req: Request, res: Response) => {

    const id = req.params.id;

    const query = 'SELECT ppa.ppa_id, ppa.ppa_fecha_inicio, ppa.ppa_descripcion, ppa.ppa_fecha_cumplimiento, ppa.carg_id, car.carg_nombre, ppa.ppa_observaciones,ppa.pqrs_id,' +
        ' pqrs.pqrs_descripcion, ppa_estado FROM pqrs_plan_accion ppa join cargos car ON car.carg_id = ppa.carg_id JOIN pqrs on ppa.pqrs_id = pqrs.pqrs_id WHERE pqrs.pqrs_id=' + id + ';';

    const listPqrsPlan = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });

    res.json(listPqrsPlan)
}

export const getPlanPqrs = async (req: Request, res: Response) => {
    const { id } = req.params;
    const planPqrs = await PlanPqrs.findByPk(id)

    if (planPqrs) {
        res.json(planPqrs)
    } else {
        res.status(404).json({
            msg: 'No existe PQRS'
        })
    }

}

export const postPlanPqrs = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await PlanPqrs.create(body);

        res.json({
            msg: 'Plan de accion Agregado Exitosamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error hable con soporte'
        })

    }


}

export const updatePlanPqrs = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;


    try {
        const planPqrs = await PlanPqrs.findByPk(id)
        if (planPqrs) {
            planPqrs.update(body);
            res.json({
                msg: 'El Plan de accion se actualizo exitosamente'
            })
        } else {
            res.status(404).json({
                msg: `No existe el plan de accion con el id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ha ocurrido un error hable con soporte'
        })

    }

}


