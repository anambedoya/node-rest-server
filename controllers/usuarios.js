import {response, request } from 'express';
import { Usuario } from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
const { genSaltSync, hashSync } = bcryptjs;

export const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    // Para evitar operación bloqueante
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

export const usuariosPut = async (req, res) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO: Validar contra base de datos
    if(password) {
        // Encriptar la contraseña
        const salt = genSaltSync(10);
        resto.password = hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        msg: 'put API - controlador',
        usuario
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

export const usuariosDelete = async (req, res) => {
    const { id } = req.params;

    // Físicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json({
        usuario
    })
}