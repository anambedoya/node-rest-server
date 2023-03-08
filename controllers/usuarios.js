import {response, request } from 'express';
import { Usuario } from '../models/usuario.js';

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
    const body = req.body;
    const usuario = new Usuario(body);

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