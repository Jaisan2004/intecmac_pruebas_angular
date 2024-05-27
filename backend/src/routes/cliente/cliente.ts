import {Router} from 'express';
import { getCliente, getClientes, postCliente, updateCliente } from '../../controllers/cliente/cliente';


const router = Router();

router.get('/', getClientes);
router.get('/:id', getCliente);
router.post('/', postCliente);
router.put('/:id', updateCliente);

export default router;