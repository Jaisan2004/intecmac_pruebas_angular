import {Router} from 'express';
import { getPqrsPlan } from '../../controllers/pqrs/pqrs_plan_accion';



const router = Router();

router.get('/plan_accion/:id', getPqrsPlan);


export default router;