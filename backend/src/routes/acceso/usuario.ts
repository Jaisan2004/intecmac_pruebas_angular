import {Router} from 'express';
import { getUser, getUsers, loginUsuario, permisosUsuario, postUser, updateUser } from '../../controllers/acceso/usuarios';
import validarToken from '../validad_token';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/nuevo', postUser);
router.post('/login', loginUsuario);
router.post('/permisos', validarToken, permisosUsuario);
router.put('/:id', updateUser)

export default router;