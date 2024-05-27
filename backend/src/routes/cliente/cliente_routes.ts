import {Router} from 'express';
import { getClienteClasificaciones } from '../../controllers/cliente/cliente_clasificacion';
import { getClienteCiudades } from '../../controllers/cliente/cliente_ciudad';
import { getClienteZonaCiudades } from '../../controllers/cliente/cliente_zona';


const router = Router();

router.get('/cliente_clasificacion', getClienteClasificaciones);
router.get('/cliente_ciudad', getClienteCiudades);
router.get('/cliente_zona/:id', getClienteZonaCiudades);


export default router;