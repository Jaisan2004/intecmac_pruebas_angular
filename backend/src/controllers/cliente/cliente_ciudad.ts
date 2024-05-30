import { Request, Response } from 'express'

import Cliente_Ciudad from '../../models/cliente/cliente_ciudad';

export const getClienteCiudades = async(req: Request, res: Response) => {
    const listClienteCiudad = await Cliente_Ciudad.findAll({
        order:[['c_c_nombre', 'ASC']]
    })

    res.json(listClienteCiudad)
}
