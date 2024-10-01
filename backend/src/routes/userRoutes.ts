// src/routes/userRoutes.ts

import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { body, validationResult } from 'express-validator';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

const router = Router();
const userController = new UserController();

// Middleware para validação de requisições
const validate = (validations: any[]) => {
  return async (req: any, res: any, next: any) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};

// Rota de criação de usuário com validações
router.post(
  '/create-user',
  validate([
    body('name').notEmpty().withMessage('Nome é obrigatório.'),
    body('email').isEmail().withMessage('Email inválido.'),
    body('cpf').custom((value) => {
      if (!cpfValidator.isValid(value)) {
        throw new Error('CPF inválido.');
      }
      return true;
    }),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres.'),
  ]),
  async (req, res) => {
    try {
      await userController.createUser(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor', error });
    }
  }
);

// Rota de login de usuário com validações
router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Email inválido.'),
    body('password').notEmpty().withMessage('Senha é obrigatória.'),
  ]),
  async (req, res) => {
    try {
      await userController.login(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor', error });
    }
  }
);

export default router;
