import {Router} from 'express';
import { getCargo } from '../controllers/cargoController';


const router = Router();

router.get('/:id', getCargo);

export default router;