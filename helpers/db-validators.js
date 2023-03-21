import { Role } from "../models/rol.js";
import { Usuario } from "../models/usuario.js";

export const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ rol: role });
    if(!existeRol) {
        throw new Error(`El rol ${role} no está registrado en la BD`)
    }
}

export const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });

    if(existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado en la BD`)
    }
}

