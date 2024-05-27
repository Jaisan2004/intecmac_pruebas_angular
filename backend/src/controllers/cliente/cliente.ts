import { Request, Response } from 'express';
import sequelize from '../../db/connection';
import Cliente from '../../models/cliente/cliente';
import { QueryTypes } from 'sequelize';

export const getClientes = async(req: Request, res: Response) => {
    const query = `SELECT c.cli_id, c.cli_nombre, c.cli_nit, cc.cli_cla_clasificacion,concat(cci.c_c_nombre,"/",cz.cz_nombre) as zona,`+
    ` c.cli_direccion, c.cli_telefono, c.cli_asesor_nombre, c.cli_pp_sistema FROM cliente c inner JOIN cliente_clasificacion cc on`+
    ` c.id_clasificacion=cc.cli_cla_id INNER JOIN cliente_ciudad cci on c.cli_ciudad = cci.c_c_id INNER JOIN cliente_zona cz on c.cli_zona = cz.cz_id ORDER BY c.cli_nombre;`
    const listCliente = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });

    res.json(listCliente)
}

export const getCliente= async (req: Request, res: Response)=>{
    const {id} = req.params;
    const pqrs = await Cliente.findByPk(id)

    if(pqrs){
        res.json(pqrs)
    }else{
        res.status(404).json({
            msg: 'No existe PQRS'
        })
    }
    
}

export const postCliente = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Cliente.create(body);

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

export const updateCliente = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;


    try {
        const cliente = await Cliente.findByPk(id)
        if (cliente) {
            cliente.update(body);
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