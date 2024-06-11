import { Request, Response } from 'express'
import Producto from '../models/producto';

export const getProductos = async(req: Request, res: Response) => {
    const listProducto = await Producto.findAll()

    res.json(listProducto)
}

export const getProducto= async (req: Request, res: Response)=>{
    const {id} = req.params;
    const pqrs = await Producto.findByPk(id)

    if(pqrs){
        res.json(pqrs)
    }else{
        res.status(404).json({
            msg: 'No existe PQRS'
        })
    }
    
}

export const postProducto = async (req: Request, res: Response)=>{
    const {body} =  req;

    try {
        await Producto.create(body);

        res.json({
            msg: `Producto: "${body.prod_descripcion}" creado exitosamente`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error en el servidor hable con soporte'
        });
    }
}

export const updateProducto = async (req: Request, res: Response)=>{
    const{id} = req.params;
    const {body} = req;

    try {
        const producto = await Producto.findByPk(id);
        if(producto){
            producto.update(body);

            res.json({
                msg: `Se modifico el Producto: ${body.prod_descripcion} exitosamente`
            });
        }else{
            res.status(404).json({
                msg: `No exite ningun Producto con el id: ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al editar el producto hable con soporte'
        });
    }
}