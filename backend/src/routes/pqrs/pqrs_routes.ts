import {Router} from 'express';
import { getPqrsPlan, postPlanPqrs } from '../../controllers/pqrs/pqrs_plan_accion';



const router = Router();

router.get('/plan_accion/:id', getPqrsPlan);
router.post('/plan_accion/', postPlanPqrs);


export default router;