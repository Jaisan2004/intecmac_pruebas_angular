import {Router} from 'express';
import { getCargo, getCargoByArea } from '../../controllers/cargos/cargoController';
import validarToken from '../validad_token';


const router = Router();

router.get('/traer/:id', validarToken,getCargo);
router.get('/traerByArea/:id', getCargoByArea);

export default router;