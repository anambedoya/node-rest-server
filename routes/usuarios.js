import { Router } from "express";
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from "../controllers/usuarios.js";

export const router = Router();

// Función pasada por referencia porque aún no se debe ejecutar la función, solo cuando se esté usando la ruta
router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.patch('/', usuariosPatch)

router.delete('/', usuariosDelete);
