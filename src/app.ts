import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import db from './config/mongo';
import { createRoles, createUserAndPerson } from './libs/initialSetup';

const PORT = process.env.PORT || 3001;
const app = express();
createRoles();
createUserAndPerson();
app.use(cors());
app.use(express.json());
app.use(router);
app.use('/static', express.static('uploads'));
db().then(() => console.log("Conexion DB lista"))

app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));