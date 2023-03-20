import { Router } from "express";
import { check } from 'express-validator';
import { Role } from "../models/rol.js";

import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from "../controllers/usuarios.js";
import { validarCampos } from '../middlewares/validar-campos.js';

export const router = Router();

// Función pasada por referencia porque aún no se debe ejecutar la función, solo cuando se esté usando la ruta
router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(async (role = '') => {
        const existeRol = await Role.findOne({ rol: role });
        if(!existeRol) {
            throw new Error(`El rol ${role} no está registrado en la BD`)
        }
    }),
    validarCampos
] ,usuariosPost);

router.patch('/', usuariosPatch)

router.delete('/', usuariosDelete);
