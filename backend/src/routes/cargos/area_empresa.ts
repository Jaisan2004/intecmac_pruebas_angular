import {Router} from 'express';
import validarToken from '../validad_token';
import { getAreasEmpresa } from '../../controllers/cargos/area_empresa';


const router = Router();

router.get('/', validarToken,getAreasEmpresa);

export default router;