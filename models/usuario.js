import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE'] // Se buscan en la BD
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

export const Usuario = model('Usuario', UsuarioSchema);