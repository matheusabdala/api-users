import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.put('/users/:id/edit', updateUser);
router.delete('/users/:id/delete', deleteUser);

export default router;