import {Router} from 'express';
import { getLastPQRS, getPQRS, getPQRSs, postPQRS, updatePQRS, updatePQRSImage, upload } from '../../controllers/pqrs/pqrs';


const router = Router();

router.get('/', getPQRSs);
router.get('/obtener/:id', getPQRS);
router.get('/ultimo_pqrs/', getLastPQRS);
router.post('/', postPQRS);
router.put('/agregarImg/:id', updatePQRSImage);
router.post('/guardarImg/', upload.single('myFile'),(req, res)=>{
    const file = req.file?.filename
    res.json({data:'Imagen Cargada', url:`http://${process.env.DB_HOST}:${process.env.PORT||3001}/${file}`})
});
router.put('/actualizar/:id', updatePQRS);

export default router;