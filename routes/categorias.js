import { Router } from "express";
import { check } from 'express-validator';

import { validarCampos, validarJWT, esAdminRole, tieneRole } from "../middlewares/index.js";
import { crearCategoria } from "../controllers/categorias.js";

export const categoriasRouter = Router();


/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
categoriasRouter.get('/', (req, res) => {
    res.json('get');
});

// Obtener una categoria por id - publico
categoriasRouter.get('/:id', (req, res) => {
    res.json('get - id');
});

// Crear categoria - privado - cualquier persona con un token válido
categoriasRouter.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar categoria - privado - cualquier persona con un token válido
categoriasRouter.put('/:id', (req, res) => {
    res.json('put');
});

// Borrar categoria - Admin
categoriasRouter.delete('/:id', (req, res) => {
    res.json('delete');
});