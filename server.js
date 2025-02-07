import express from 'express';
import userRoutes from './src/routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use(userRoutes)

//cria usuario
app.post('/users', async (req, res) => {})
app.get('/users', async (req, res) => {})
app.put('/users/:id', async (req, res) => {})
app.delete('/users/:id', async (req, res) => {});


app.listen(3002, () => {
  console.log('App iniciado na porta 3002');
});
