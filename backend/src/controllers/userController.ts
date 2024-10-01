// src/controllers/userController.ts

import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // Método para criar o usuário
    async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email, cpf, password } = req.body;

        try {
            const user = await this.userService.createUser(name, email, cpf, password);
            if (typeof user === 'string') {
                return res.status(400).json({ message: user });
            }
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor', error });
        }
    }

    // Método para fazer login
    async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        try {
            const result = await this.userService.loginUser(email, password);
            if (result) {
                return res.json(result); // Retorna o token
            } else {
                return res.status(401).json({ message: 'Email ou senha inválidos.' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno do servidor', error });
        }
    }
}
