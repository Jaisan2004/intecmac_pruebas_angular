import {Router} from 'express';
import { getPQRS, getPQRSs, postPQRS, updatePQRS, updatePQRSImage, upload } from '../../controllers/pqrs/pqrs';


const router = Router();

router.get('/', getPQRSs);
router.get('/obtener/:id', getPQRS);
router.post('/', postPQRS);
router.put('/agregarImg/:id', updatePQRSImage);
router.post('/guardarImg/', upload.single('myFile'),(req, res)=>{
    const file = req.file?.filename
    res.json({data:'Imagen Cargada', url:`http://192.168.1.17:${process.env.PORT||3001}/${file}`})
});
router.put('/actualizar/:id', updatePQRS);

export default router;