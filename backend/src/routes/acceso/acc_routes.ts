import {Router} from 'express';
import { getRol, getRoles, postRol, updateRol } from '../../controllers/acceso/roles';
import { deletePermiso, getPermiso, getPermisosByRol, postPermisos, updatePermiso } from '../../controllers/acceso/permisos';
import { getComponentes, getModulos } from '../../controllers/acceso/modulo';
import { getRutasByComponente } from '../../controllers/acceso/ruta';


const router = Router();

//Roles
router.get('/roles', getRoles);
router.get('/roles/:id', getRol);
router.post('/roles', postRol);
router.put('/roles/:id', updateRol);

//Permisos
router.get('/permisos/:id', getPermisosByRol);
router.get('/permiso/:id', getPermiso);
router.post('/permisos', postPermisos);
router.put('/permisos/:id', updatePermiso);
router.delete('/permisos/:id', deletePermiso);

//Modulos
router.get('/modulos', getModulos);

//Componentes
router.get('/componentes/:id', getComponentes);

//Rutas
router.get('/rutas/:id', getRutasByComponente);



export default router;