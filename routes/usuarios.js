import { Router } from "express";
import { check } from 'express-validator';

import { emailExiste, esRoleValido, existeUsuarioPorId } from "../helpers/db-validators.js";
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole, tieneRole } from "../middlewares/validar-roles.js";

import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from "../controllers/usuarios.js";

export const usuariosRouter = Router();

// Función pasada por referencia porque aún no se debe ejecutar la función, solo cuando se esté usando la ruta
usuariosRouter.get('/', usuariosGet);

usuariosRouter.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
],usuariosPut);

usuariosRouter.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
] ,usuariosPost);

usuariosRouter.patch('/', usuariosPatch)

usuariosRouter.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete);
