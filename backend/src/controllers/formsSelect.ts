import { Request, Response } from 'express'
import Cliente from '../models/cliente/cliente';
import Producto from '../models/producto';
import Pqrs_Causa from '../models/pqrs/pqrs_causa_raiz';
import Cargo from '../models/cargos/cargos';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';
import Pqrs_Tipologia from '../models/pqrs/pqrs_tipologia';


export const getClienteOption = async (req: Request, res: Response) => {
    const listCliente = await Cliente.findAll({
        attributes: ['cli_id', 'cli_nombre'],
        order: [['cli_nombre', 'ASC']]
    })

    res.json(listCliente)
}

export const getInfoCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const query = 'SELECT c.cli_nombre, concat(cc.c_c_nombre,"/",cz.cz_nombre) as zona, c.cli_pp_sistema,c.cli_asesor_nombre FROM cliente c INNER JOIN cliente_ciudad cc ON c.cli_ciudad = cc.c_c_id INNER JOIN cliente_zona cz on cz.cz_id=c.cli_zona WHERE cli_id='+id+';';
    const pqrs = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });

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
        attributes: ['prod_id', 'prod_descripcion'],
        order: [['prod_descripcion','ASC']]
    })

    res.json(listProducto)
}

export const getInfoProducto = async (req: Request, res: Response) => {
    const {id} = req.params;
    const query = 'SELECT pp.pqrs_productos_id, pr.prod_ref, pr.prod_descripcion, pp.lote, pp.cantidad FROM pqrs_productos pp INNER JOIN pqrs p on pp.pqrs_id = p.pqrs_id '
    +'INNER JOIN productos pr on pp.prod_id = pr.prod_id where p.pqrs_id = '+id+';'

    try {
        const listProducto = await sequelize.query(query,{
            type:QueryTypes.SELECT
        })
    
        if (listProducto) {
    
            res.json(listProducto)
    
        } else {
            res.status(404).json({
                msg: 'No existe PQRS'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al traer los productos'
        });
    }
}


export const getPqrsCausaOption = async (req: Request, res: Response) => {
    const listCausas = await Pqrs_Causa.findAll({
        order: [['pcr_causa', 'ASC']]
    })

    res.json(listCausas)
}

export const getCargosOption = async (req: Request, res: Response) => {
    const listCargos = await Cargo.findAll({
        order: [['carg_nombre', 'ASC']]
    })

    res.json(listCargos)
}

export const getPqrsTipologiaOption = async (req: Request, res: Response) => {
    const listTipologia = await Pqrs_Tipologia.findAll()

    res.json(listTipologia)
}
