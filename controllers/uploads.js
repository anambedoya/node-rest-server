import { response } from "express";
import { subirArchivo } from "../helpers/subir-archivo.js";

export const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg: 'No hay archivos que subir'});
    return;
  }

  try {
    // Txt, md
    const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
    res.json({ nombre })
  } catch (msg) {
    res.status(400).json({msg})
  }
}