import { Request, Response } from 'express'
import Cliente from '../models/cliente';
import Producto from '../models/producto';
import Pqrs_Causa from '../models/pqrs/pqrs_causa_raiz';
import Cargo from '../models/cargos';
import Pqrs_Tipologia from '../models/pqrs/pqrs_tipologia';


export const getClienteOption = async (req: Request, res: Response) => {
    const listCliente = await Cliente.findAll({
        attributes: ['cli_id', 'cli_nombre']
    })

    res.json(listCliente)
}

export const getInfoCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pqrs = await Cliente.findByPk(id, {
        attributes: ['cli_zona', 'cli_asesor_nombre']
    })

    if (pqrs) {
        res.json(pqrs)
    } else {
        res.status(404).json({
            msg: 'No existe PQRS'
        })
    }

}
export const getProductoOption = async (req: Request, res: Response) => {
    const listProducto = await Producto.findAll({
        attributes: ['prod_id', 'prod_descripcion']
    })

    res.json(listProducto)
}

export const getPqrsCausaOption = async (req: Request, res: Response) => {
    const listCausas = await Pqrs_Causa.findAll()

    res.json(listCausas)
}

export const getCargosOption = async (req: Request, res: Response) => {
    const listCargos = await Cargo.findAll()

    res.json(listCargos)
}

export const getPqrsTipologiaOption = async (req: Request, res: Response) => {
    const listTipologia = await Pqrs_Tipologia.findAll()

    res.json(listTipologia)
}
