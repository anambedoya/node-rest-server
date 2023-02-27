import {response, request } from 'express';

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

export const usuariosPost = (req, res) => {
    const {nombre, edad} = req.body;

    res.status(200).json({
        msg: 'post API - controlador',
        nombre,
        edad
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