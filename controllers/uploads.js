import { response } from "express";
import { subirArchivo } from "../helpers/subir-archivo.js";
import path from "path";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();
import cloudinary from 'cloudinary';
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

import { fileURLToPath } from 'url';

import { Usuario } from '../models/usuario.js';
import { Producto } from "../models/producto.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

  // Limpiar imágenes previas
  if(modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if(fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
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

export const actualizarImagenCloudinary = async (req, res = response) => {
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

  // Limpiar imágenes previas
  if(modelo.img) {
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length-1];
    const [ public_id ] = nombre.split('.');
    cloudinary.v2.uploader.destroy(public_id);
  }

  try {
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    await modelo.save();
  
    res.json(modelo);
  } catch (msg) {
    res.status(400).json({msg})
  }
}

export const mostrarImagen = async (req, res = response) => {
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

  // Limpiar imágenes previas
  if(modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if(fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const pathImagenPlaceholder = path.join(__dirname, '../assets/no-image.jpg');
  return res.sendFile(pathImagenPlaceholder);
}