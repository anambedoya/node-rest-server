import { response } from "express";
import { Usuario } from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from "../helpers/generar-jwt.js";

export const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - correo'
            })
        }

        // Verificar si el usuario está activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado false'
            })
        }

        // Verificar el password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

        res.json({
            msg: 'Login ok'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administador'
        })
    }
}