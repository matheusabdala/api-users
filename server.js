import express from 'express';
import userRoutes from './src/routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use(userRoutes)

app.listen(3002, '0.0.0.0', () => {
  console.log('App iniciado na porta 3002');
});
