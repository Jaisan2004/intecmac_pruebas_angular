import {Router} from 'express';
import { getCliente, getClientes, postCliente, updateCliente } from '../../controllers/cliente/cliente';
import validarToken from '../validad_token';


const router = Router();

router.get('/', validarToken, getClientes);
router.get('/:id', validarToken,getCliente);
router.post('/', validarToken, postCliente);
router.put('/:id', validarToken, updateCliente);

export default router;