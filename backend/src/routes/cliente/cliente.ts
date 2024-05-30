import {Router} from 'express';
import { getCliente, getClientes, postCliente, updateCliente } from '../../controllers/cliente/cliente';
import validarToken from '../validad_token';


const router = Router();

router.get('/', validarToken, getClientes);
router.get('/:id', getCliente);
router.post('/', postCliente);
router.put('/:id', updateCliente);

export default router;