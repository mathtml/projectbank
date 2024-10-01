// src/routes/index.ts
import { Router } from 'express';
import userRoutes from './userRoutes';
// Importe outras rotas conforme necessário

const router = Router();

// Adicione suas rotas aqui
router.use('/create/user', userRoutes); // Prefixo para as rotas de usuário
// Adicione outras rotas, por exemplo:
// router.use('/api/another', anotherRoutes);

export default router;
