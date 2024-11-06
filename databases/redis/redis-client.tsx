import { createClient } from 'redis';
import dotenv from "dotenv";

//Generar el cliente de redis con el host, port, username y password
dotenv.config();
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

export default redisClient;