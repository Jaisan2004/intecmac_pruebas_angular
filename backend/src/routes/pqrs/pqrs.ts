import {Router} from 'express';
import { getPQRS, getPQRSs, postPQRS, updatePQRS, updatePQRSImage } from '../../controllers/pqrs/pqrs';


const router = Router();

router.get('/', getPQRSs);
router.get('/obtener/:id', getPQRS);
router.post('/', postPQRS);
router.put('/agregarImg/:id', updatePQRSImage);
router.put('/actualizar/:id', updatePQRS);

export default router;