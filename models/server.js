import express from 'express';
import cors from 'cors';
import { usuariosRouter } from '../routes/usuarios.js';
import { loginRouter } from '../routes/auth.js';
import { dbConnection } from '../database/config.js';

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        
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
        this.app.use(this.authPath, loginRouter);
        this.app.use(this.usuariosPath, usuariosRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto' ,this.port);
        });
    }
}