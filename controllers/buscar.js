import { response } from "express";
import { isValidObjectId } from "mongoose";
import { Usuario, Categoria, Producto } from "../models/index.js";

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoId = isValidObjectId(termino) // TRUE

    if(esMongoId) {
        const usuario = await Usuario.find({_id: termino, estado: true});
        return res.json({
            results: usuario
        });
    }

    const regex = new RegExp(termino, 'i'); // Expresión regular para que no sea sensible a mayúsculas y minúsculas

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    return res.json({
        results: usuarios
    });
}

const buscarCategorias = async (termino = '', res = response) => {
    const esMongoId = isValidObjectId(termino) // TRUE

    if(esMongoId) {
        const categoria = await Categoria.find({_id: termino, estado: true});
        return res.json({
            results: categoria
        });
    }

    const regex = new RegExp(termino, 'i'); // Expresión regular para que no sea sensible a mayúsculas y minúsculas

    const categorias = await Categoria.find({nombre: regex, estado: true});

    return res.json({
        results: categorias
    });
}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoId = isValidObjectId(termino) // TRUE

    if(esMongoId) {
        const producto = await Producto.find({_id: termino, estado: true}).populate('categoria', 'nombre');
        return res.json({
            results: producto
        });
    }

    const regex = new RegExp(termino, 'i'); // Expresión regular para que no sea sensible a mayúsculas y minúsculas

    const productos = await Producto.find({nombre: regex, estado: true}).populate('categoria', 'nombre');

    return res.json({
        results: productos
    });
}

export const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch(coleccion) {
        case 'usuarios':
        buscarUsuarios(termino, res);
        break;

        case 'categorias':
        buscarCategorias(termino, res);
        break;

        case 'productos':
        buscarProductos(termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se le olvidó hacer esta búsqueda'
            })
    }
}