import express from 'express';
import cors from 'cors';

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

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
        this.app.get('/api', (req, res) => {
            res.status(403).json({
                msg: 'get API'
            })
        });

        this.app.put('/api', (req, res) => {
            res.status(400).json({
                msg: 'put API'
            })
        });

        this.app.post('/api', (req, res) => {
            res.status(201).json({
                msg: 'post API'
            })
        });

        this.app.delete('/api', (req, res) => {
            res.status(403).json({
                msg: 'delete API'
            })
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto' ,this.port);
        });
    }
}