import {response, request } from 'express';
import { Usuario } from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
const { genSaltSync, hashSync } = bcryptjs;

export const usuariosGet = (req = request, res = response) => {
    const {q, nombre = 'No name', apiKey, page = 1, limit } = req.query;

    res.status(200).json({
        msg: 'get API - controlador',
        q,
        nombre,
        apiKey,
        page,
        limit
    })
}

export const usuariosPut = (req, res) => {
    const id = req.params.id;

    res.status(200).json({
        msg: 'put API - controlador',
        id
    })
}

export const usuariosPost = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    // Encriptar la contraseña
    const salt = genSaltSync(10);
    usuario.password = hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.status(200).json({
        msg: 'post API - controlador',
        usuario
    })
}

export const usuariosPatch = (req, res) => {
    res.status(200).json({
        msg: 'patch API - controlador'
    })
}

export const usuariosDelete = (req, res) => {
    res.status(200).json({
        msg: 'delete API - controlador'
    })
}