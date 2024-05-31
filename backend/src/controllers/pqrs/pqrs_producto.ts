import { Request, Response, text } from 'express'
import sequelize from '../../db/connection';
import { QueryTypes } from 'sequelize';
import PqrsProducto from '../../models/pqrs/pqrs_producto';

export const getPqrsProductos = async (req: Request, res: Response) => {
    const query = 'SELECT pp.pqrs_productos_id, p.pqrs_id, pr.prod_id,pr.prod_ref, pr.prod_descripcion, pp.lote, pp.cantidad FROM pqrs_productos pp INNER JOIN pqrs p on pp.pqrs_id = p.pqrs_id '
    +'INNER JOIN productos pr on pp.prod_id = pr.prod_id;'

    const listProducto = await sequelize.query(query,{
        type:QueryTypes.SELECT
    })

    if (listProducto) {

        res.json(listProducto)

    } else {
        res.status(404).json({
            msg: 'No existen Productos en la Pqrs'
        })
    }
}

export const getPqrsProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const prsProducto = await PqrsProducto.findByPk(id)

    if (prsProducto) {
        res.json(prsProducto)
    } else {
        res.status(404).json({
            msg: 'No existe Producto en la pqrs PQRS'
        })
    }

}

export const postPqrsProducto = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await PqrsProducto.create(body);

        res.json({
            msg: 'Producto Agregado a la Pqrs Exitosamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error hable con soporte'
        })

    }


}

export const updatePqrsProducto = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;


    try {
        const pqrsProducto = await PqrsProducto.findByPk(id)
        if (pqrsProducto) {
            pqrsProducto.update(body);
            res.json({
                msg: 'El Producto de la PQRS se actualizo exitosamente'
            })
        } else {
            res.status(404).json({
                msg: `No existe el Producto en la PQRS con el id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ha ocurrido un error hable con soporte'
        })

    }

}