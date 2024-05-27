import { Request, Response } from 'express'

import Cliente_Zona from '../../models/cliente/cliente_zona';

export const getClienteZonaCiudades = async(req: Request, res: Response) => {
    const {id} = req.params

    const listClienteZona = await Cliente_Zona.findAll({
        where: {c_c_id: id}
    })

    res.json(listClienteZona)
}
