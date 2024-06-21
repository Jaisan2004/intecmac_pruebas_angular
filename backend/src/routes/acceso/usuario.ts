import {Router} from 'express';
import { getUser, getUsers, loginUsuario, permisosUsuario, postUser, updateUser } from '../../controllers/acceso/usuarios';
import validarToken from '../validad_token';

const router = Router();

router.get('/', validarToken, getUsers);
router.get('/:id', validarToken, getUser);
router.post('/nuevo', validarToken, postUser);
router.post('/login', loginUsuario);
router.post('/permisos', validarToken, permisosUsuario);
router.put('/:id', validarToken, updateUser)

export default router;