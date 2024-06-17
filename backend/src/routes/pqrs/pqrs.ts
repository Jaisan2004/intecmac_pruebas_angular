import {Router} from 'express';
import { getLastPQRS, getPQRS, getPQRSs, postPQRS, updatePQRS, updatePQRSImage, imagePQRS } from '../../controllers/pqrs/pqrs';
import validarToken from '../validad_token';


const router = Router();

router.get('/', validarToken,getPQRSs);
router.get('/obtener/:id', validarToken,getPQRS);
router.get('/ultimo_pqrs/', validarToken,getLastPQRS);
router.post('/', validarToken,postPQRS);
router.put('/agregarImg/:id', validarToken,updatePQRSImage);
router.post('/guardarImg/', validarToken,imagePQRS.single('myFile'),(req, res)=>{
    const file = req.file?.filename
    res.json({data:'Imagen Cargada', url:`http://${process.env.DB_HOST}:${process.env.PORT||3001}/${file}`})
});
router.put('/actualizar/:id', validarToken,updatePQRS);

export default router;