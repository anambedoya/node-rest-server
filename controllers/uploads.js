import { response } from "express";
import { subirArchivo } from "../helpers/subir-archivo.js";

import { Usuario } from '../models/usuario.js';
import { Producto } from "../models/producto.js";

export const cargarArchivo = async (req, res = response) => {
  try {
    // Txt, md
    const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
    res.json({ nombre })
  } catch (msg) {
    res.status(400).json({msg});
  }
}

export const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
        modelo = await Usuario.findById(id);
        if(!modelo) {
          return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`
          });
        }
      break;
    case 'productos':
        modelo = await Producto.findById(id);
        if(!modelo) {
          return res.status(400).json({
            msg: `No existe un producto con el id ${id}`
          });
        }
      break;
    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' });
  }

  try {
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();
  
    res.json(modelo);
  } catch (msg) {
    res.status(400).json({msg})
  }
}