import {Router} from 'express';
import { getCargo } from '../controllers/cargoController';
import validarToken from './validad_token';


const router = Router();

router.get('/:id', validarToken,getCargo);

export default router;