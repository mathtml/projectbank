// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Função middleware para verificar o token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer <token>'
    
    if (!token) {
        return res.sendStatus(401); // Não autorizado
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
        if (err) {
            return res.sendStatus(403); // Proibido
        }
        next(); // Token válido, continuar para a próxima função
    });
};
