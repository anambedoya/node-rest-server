import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' ,process.env.port);
});