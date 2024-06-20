import {Router} from 'express';
import { getCredEstudio, getCredEstudios, guardarPdf, pdfCredEstudio, postCredEstudio, updateCredEstudio } from '../../controllers/cred_estudio/cred_estudio';
import validarToken from '../validad_token';




const router = Router();

router.get('/', getCredEstudios);
router.get('/:id', getCredEstudio);
router.post('/', postCredEstudio);
router.post('/agregarPdf', validarToken,pdfCredEstudio.single('myfile'), guardarPdf);
router.put('/:id', updateCredEstudio);

export default router;