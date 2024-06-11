import {Router} from 'express';
import validarToken from './validad_token';
import { getProducto, getProductos, postProducto, updateProducto } from '../controllers/producto';

const router = Router();

router.get('/', validarToken, getProductos);
router.get('/:id', validarToken, getProducto);
router.post('/', validarToken, postProducto);
router.put('/:id', validarToken, updateProducto);

export default router;