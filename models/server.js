import express from 'express';
import cors from 'cors';
import { router } from '../routes/usuarios.js';

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'; 

        //Middlewares: funciones que añaden otra funcionalidad al server
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto' ,this.port);
        });
    }
}