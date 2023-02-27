import {response } from 'express';

export const usuariosGet = (req, res = response) => {
    res.status(403).json({
        msg: 'get API - controlador'
    })
}

export const usuariosPut = (req, res) => {
    res.status(400).json({
        msg: 'put API - controlador'
    })
}

export const usuariosPost = (req, res) => {
    res.status(201).json({
        msg: 'post API - controlador'
    })
}

export const usuariosPatch = (req, res) => {
    res.status(201).json({
        msg: 'patch API - controlador'
    })
}

export const usuariosDelete = (req, res) => {
    res.status(403).json({
        msg: 'delete API - controlador'
    })
}