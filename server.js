import express from 'express';
import cors from 'cors';

import userRoutes from './src/routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);

app.listen(3002, '0.0.0.0', () => {
  console.log('App iniciado na porta 3002');
});
