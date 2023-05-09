import express from 'express';
import cors from 'cors';
import { usuariosRouter } from '../routes/usuarios.js';
import { loginRouter } from '../routes/auth.js';
import { dbConnection } from '../database/config.js';
import { categoriasRouter } from '../routes/categorias.js';
import { productosRouter } from '../routes/productos.js';
import { buscarRouter } from '../routes/buscar.js';

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
        }
        
        // Conectar a base de datos
        this.conectarDB();

        //Middlewares: funciones que añaden otra funcionalidad al server
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, loginRouter);
        this.app.use(this.paths.buscar, buscarRouter);
        this.app.use(this.paths.categorias, categoriasRouter);
        this.app.use(this.paths.productos, productosRouter);
        this.app.use(this.paths.usuarios, usuariosRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto' ,this.port);
        });
    }
}