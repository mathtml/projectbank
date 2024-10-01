// src/components/Login.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';
import api from '../api/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post('/create/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Armazena o token no localStorage
        localStorage.setItem('token', response.data.token);
        setSuccess(true);
        // Limpa os campos após o login bem-sucedido
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      // Acesse a mensagem de erro do backend, se disponível
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message); // Mostra a mensagem de erro do backend
      } else {
        setError('Erro ao fazer login. Verifique os dados e tente novamente.');
      }
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Login</h2>
      {success && <p>Login realizado com sucesso!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
