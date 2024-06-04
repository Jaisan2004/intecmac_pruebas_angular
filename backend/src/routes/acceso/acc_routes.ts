import {Router} from 'express';
import { getRol, getRoles, postRol, updateRol } from '../../controllers/acceso/roles';
import { getPermisosByRol } from '../../controllers/acceso/permisos';


const router = Router();

//Roles
router.get('/roles', getRoles);
router.get('/roles/:id', getRol);
router.post('/roles', postRol);
router.put('/roles/:id', updateRol);

//Permisos
router.get('/permisos/:id', getPermisosByRol);

export default router;