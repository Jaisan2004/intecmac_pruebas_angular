import {Router} from 'express';
import { getPlanPqrs, getPqrsPlanes, postPlanPqrs, updatePlanPqrs } from '../../controllers/pqrs/pqrs_plan_accion';



const router = Router();

router.get('/planes_accion/:id', getPqrsPlanes);
router.post('/plan_accion/', postPlanPqrs);
router.get('/plan_accion/:id', getPlanPqrs);
router.put('/plan_accion/:id', updatePlanPqrs);


export default router;