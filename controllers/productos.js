import { Producto } from "../models/producto.js";
import { Categoria } from "../models/categoria.js";

// Obtener productos - paginado - total - populate
export const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate("usuario", "nombre")
            .populate("categoria", "nombre")
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        productos
    })
}

// Obtener producto - populate {}
export const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
                            .populate("usuario", "nombre")
                            .populate("categoria", "nombre");

    res.status(200).json(producto)
}

export const crearProducto = async (req, res = response) => {
    const { nombre, descripcion, precio, categoria } = req.body;
    const categoriaCapitalizada = categoria.toUpperCase();

    const productoDB = await Producto.findOne({nombre});
    const categoriaDB = await Categoria.findOne({nombre: categoriaCapitalizada});
    
    if(!categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoria} no existe`
        })
    }

    if(productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }

    // Generar la data a guardar
    const data = {
        nombre,
        descripcion,
        precio,
        categoria: categoriaDB._id,
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);
}

// Actualizar producto
export const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    const categoriaCapitalizada = data.categoria.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre: categoriaCapitalizada});

    if(!categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${data.categoria} no existe, no es posible actualizar`
        })
    } else {
        data.categoria = categoriaDB._id;
    }
    
    const productoById = await Producto.findById(id);
    
    if(productoById.estado == false) {
        res.status(400).json({
            msg: 'El producto está eliminado'
        })
    } else {
        data.usuario = req.usuario._id;
        const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json(producto)
    }
}

// Borrar producto - estado: false
export const borrarProducto = async (req, res = response) => {
    const id = req.params.id;

    const productoById = await Producto.findById(id);
    if(productoById.estado == false) {
        res.status(400).json({
            msg: 'El producto ya está eliminado'
        })
    } else {
        const producto = await Producto.findByIdAndUpdate(id, { estado: false}, { new: true });
    
        res.status(200).json(producto)
    }
}