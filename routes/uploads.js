import { Router } from "express";
import { check } from "express-validator";
import { actualizarImagen, actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from "../controllers/uploads.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";
import { validarArchivo } from "../middlewares/validar-archivos.js";

export const uploadsRouter = Router();

uploadsRouter.post('/', validarArchivo, cargarArchivo);

uploadsRouter.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);
//], actualizarImagen);

uploadsRouter.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);