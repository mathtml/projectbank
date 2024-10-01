// src/components/Register.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';
import api from './api/api';
import Login from './telaLogin';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post('/create/user/create-user', {
        name,
        cpf,
        email,
        password,
      });
      if (response.status === 201) {
        setSuccess(true);
        // Limpa os campos após o cadastro bem-sucedido
        setName('');
        setCpf('');
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      // Acesse a mensagem de erro do backend, se disponível
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message); // Mostra a mensagem de erro do backend
      } else {
        setError('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
      }
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Cadastro de Usuário</h2>
      {success && <p>Usuário cadastrado com sucesso!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
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
          Cadastrar
        </Button>
      </form>

      <Login />
    </Container>

    
  );
};

export default Register;
