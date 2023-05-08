import { Router } from "express";
import { check } from 'express-validator';

import { validarCampos, validarJWT, esAdminRole, tieneRole } from "../middlewares/index.js";
import { actualizarProducto, borrarProducto, crearProducto, obtenerProducto, obtenerProductos } from "../controllers/productos.js";
import { existeProducto } from "../helpers/db-validators.js";

export const productosRouter = Router();


/**
 * {{url}}/api/productos
 */

// Obtener todos los productos - publico
productosRouter.get('/', obtenerProductos);

// Obtener un producto por id - publico
productosRouter.get('/:id', [
    check('id', 'No es un ID válido').isMongoId().bail().custom(existeProducto),
    validarCampos
], obtenerProducto);

// Crear producto - privado - cualquier persona con un token válido
productosRouter.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto);

// Actualizar producto - privado - cualquier persona con un token válido
productosRouter.put('/:id',[
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('id', 'No es un ID válido').isMongoId(),
   check('id').custom(existeProducto),
   validarCampos 
], actualizarProducto);

// Borrar producto - Admin
productosRouter.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto);