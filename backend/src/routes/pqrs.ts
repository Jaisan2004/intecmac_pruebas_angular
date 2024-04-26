import {Router} from 'express';
import { getPQRS, getPQRSs, postPQRS, updatePQRS } from '../controllers/pqrs/pqrs';


const router = Router();

router.get('/', getPQRSs);
router.get('/:id', getPQRS);
router.post('/', postPQRS);
router.put('/:id', updatePQRS);

export default router;