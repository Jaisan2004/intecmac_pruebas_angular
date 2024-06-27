import {Router} from 'express';
import { getClienteClasificaciones } from '../../controllers/cliente/cliente_clasificacion';
import { getClienteCiudad, getClienteCiudades, postClienteCiudad, updateClienteCiudad } from '../../controllers/cliente/cliente_ciudad';
import { getClienteZonaCiudades } from '../../controllers/cliente/cliente_zona';


const router = Router();

router.get('/cliente_clasificacion', getClienteClasificaciones);

//Ciudades del cliente
router.get('/cliente_ciudad', getClienteCiudades);
router.get('/cliente_ciudad/:id', getClienteCiudad);
router.post('/cliente_ciudad', postClienteCiudad);
router.put('/cliente_ciudad/:id', updateClienteCiudad);

router.get('/cliente_zona/:id', getClienteZonaCiudades);


export default router;