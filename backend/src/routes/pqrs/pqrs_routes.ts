import {Router} from 'express';
import { getPlanPqrs, getPqrsPlanes, postPlanPqrs, updatePlanPqrs } from '../../controllers/pqrs/pqrs_plan_accion';
import { deletePqrsProducto, getPqrsProducto, postPqrsProducto, updatePqrsProducto } from '../../controllers/pqrs/pqrs_producto';
import { getInfoProducto } from '../../controllers/formsSelect';
import validarToken from '../validad_token';
import { correoCreaPQRS, correoPlan } from '../../controllers/enviosCorreos';


const router = Router();

//Pqrs productos
router.post('/pqrs_producto/', validarToken, postPqrsProducto);
router.get('/pqrs_productos/:id', validarToken, getInfoProducto);
router.get('/pqrs_producto/:id', validarToken, getPqrsProducto);
router.put('/pqrs_producto/:id', validarToken, updatePqrsProducto);
router.delete('/pqrs_producto/:id', validarToken, deletePqrsProducto);

//Pqrs Planes de accion
router.get('/planes_accion/:id', validarToken, getPqrsPlanes);
router.post('/plan_accion/', validarToken, postPlanPqrs);
router.get('/plan_accion/:id', validarToken, getPlanPqrs);
router.put('/plan_accion/:id', validarToken, updatePlanPqrs);

//correos PQRS
router.post('/plan_accion_correo', validarToken, correoPlan);
router.post('/pqrs_creada', validarToken, correoCreaPQRS);

export default router;