import {Router} from 'express';
import { getCliente, getClientes } from '../controllers/cliente';


const router = Router();

router.get('/', getClientes);
router.get('/:id', getCliente);



export default router;