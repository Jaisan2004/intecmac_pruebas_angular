import {Router} from 'express';
import { getRoles } from '../../controllers/acceso/roles';


const router = Router();

router.get('/roles', getRoles);

export default router;