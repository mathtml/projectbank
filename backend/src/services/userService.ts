// src/services/UserService.ts
import jwt from 'jsonwebtoken'; // Importando jwt
import bcrypt from 'bcrypt';
import { User } from '../models/user'; // Corrija se o caminho estiver diferente

export class UserService {
    async createUser(name: string, email: string, cpf: string, password: string): Promise<User | string> {
        try {
            // Verifica se o CPF já está cadastrado
            const existingUserByCpf = await User.findOne({ where: { cpf } });
            if (existingUserByCpf) {
                return 'CPF já cadastrado';
            }

            // Verifica se o e-mail já está cadastrado
            const existingUserByEmail = await User.findOne({ where: { email } });
            if (existingUserByEmail) {
                return 'E-mail já cadastrado';
            }

            // Gerar o hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Criar o usuário com a senha hash
            const user = await User.create({
                name,
                email,
                cpf,
                password: hashedPassword,
            });
            return user; // Retorna o usuário criado
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return 'Erro ao criar usuário';
        }
    }

    async loginUser(email: string, password: string): Promise<{ token: string } | null> {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return null; // Usuário não encontrado
            }

            // Verifica a senha
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return null; // Senha incorreta
            }

            // Gera um token
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
            return { token };
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return null;
        }
    }
}
