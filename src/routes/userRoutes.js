import express from 'express';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// router.post('/users', createUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Configuração do multer para salvar as imagens na pasta 'uploads'
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Rota para criar usuário com foto
router.post("/users", upload.single("profilePicture"), async (req, res) => {
  try {
    const { email, name, age, password } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword: ', password)

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        age: parseInt(age),
        password: hashedPassword,
        profilePicture,
      },
    });


    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao criar usuário!" });
  }
});

export default router;