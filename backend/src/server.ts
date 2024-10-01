import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importando o CORS
import routes from './routes';

dotenv.config();

const app = express();
app.use(cors()); // Usando o middleware do CORS
app.use(express.json()); // Middleware para parsear JSON

// Configurando as rotas
app.use('/', routes); // Acesse suas rotas a partir da raiz

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
