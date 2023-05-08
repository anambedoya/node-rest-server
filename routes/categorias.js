import { Router } from "express";
import { check } from 'express-validator';

import { existeCategoria } from "../helpers/db-validators.js";
import { validarCampos, validarJWT, esAdminRole, tieneRole } from "../middlewares/index.js";
import { actualizarCategoria, borrarCategoria, crearCategoria, obtenerCategoria, obtenerCategorias } from "../controllers/categorias.js";

export const categoriasRouter = Router();


/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
categoriasRouter.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
categoriasRouter.get('/:id', [
    check('id', 'No es un ID válido').isMongoId().bail().custom(existeCategoria),
    validarCampos
], obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token válido
categoriasRouter.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar categoria - privado - cualquier persona con un token válido
categoriasRouter.put('/:id',[
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('id', 'No es un ID válido').isMongoId(),
   check('id').custom(existeCategoria),
   validarCampos 
], actualizarCategoria);

// Borrar categoria - Admin
categoriasRouter.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],borrarCategoria);