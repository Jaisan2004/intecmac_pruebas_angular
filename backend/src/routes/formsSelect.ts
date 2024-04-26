import {Router} from 'express';
import { getCargosOption, getClienteOption, getInfoCliente, getPqrsCausaOption, getPqrsTipologiaOption, getProductoOption } from '../controllers/formsSelect';


const router = Router();

router.get('/clientes', getClienteOption);
router.get('/clientes/:id', getInfoCliente);
router.get('/productos', getProductoOption);
router.get('/pqrsCausa', getPqrsCausaOption);
router.get('/cargos', getCargosOption);
router.get('/pqrsTipologia', getPqrsTipologiaOption);

export default router;