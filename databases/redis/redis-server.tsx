import express, { Request, Response } from 'express';
import redisClient from './redis-client';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

//Inicializar el Express y el Redis
const app = express();
const port = 5000;

//Para habilitar CORS para que React pueda realizar peticiones al servidor 
app.use(cors());

redisClient.on('error', (err) => console.error('Redis Client Error', err));

//Hacer la conexion con redis
redisClient.connect().catch(console.error);

//Hacer el HGET a la base de datos
app.get('/api/saldo/:id_cuenta', async (req: Request, res: Response) => {
  const { id_cuenta } = req.params;
  try {
    const clave_saldo = `cuenta:${id_cuenta}`;
    const saldo = await redisClient.hGet(clave_saldo, 'saldo');
    if (saldo) {
      res.json({ saldo: parseFloat(saldo) });
    } else {
      res.status(404).json({ error: `No se encontró ningun registro de saldo para la cuenta ${id_cuenta}` })
    }
  } catch (error) {
    console.error('Hubo un error:', error);
    res.status(500).json({ error: 'Hubo un error al obtener el saldo' });
  }
}); 

//Iniciar el servidor 
app.listen(port, () => {
  console.log(`Server up in http:localhost:${port}`);
});