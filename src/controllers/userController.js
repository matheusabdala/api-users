import bcrypt from 'bcrypt';
import prisma from '../config/prismaClient.js'

export const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
        password: hashedPassword
      }
    });
    
    return res.status(201).send(req.body);
  } catch (e) {
    console.log(e);
    return res.status(400).send('Error!')
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(400).json({ message: "Error!" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json({ message: "Error!" });
  }
};

export const updateUser = async (req, res) => {
  try {
    await prisma.user.update({
      where: {
        id: req.params.id
      },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
      }
    });
    return res.status(201).send(req.body);
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: "Error!" });
  }
}

export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id
      }
    })
    return res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (e) {
    return res.status(400).json({ message: "Error!" });
  }
}