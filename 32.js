
const express = require('express');
const multer = require('multer');

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });



let usuarios = [];

app.post('/auth/register', (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    return res.status(409).json({ erro: 'Usuário já registrado' });
  }

  const novoUsuario = { id: Date.now(), nome, email, senha };
  usuarios.push(novoUsuario);

  res.status(201).json({ mensagem: 'Usuário registrado com sucesso' });
});

app.post('/auth/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    res.json({ mensagem: 'Login bem-sucedido', token: 'seu-token-secreto' });
  } else {
    res.status(401).json({ erro: 'Credenciais inválidas' });
  }
});

app.get('/users', (req, res) => {
  res.json(usuarios);
});

app.post('/users', (req, res) => {
  const { nome, email, senha } = req.body;
  const novoUsuario = { id: Date.now(), nome, email, senha };
  usuarios.push(novoUsuario);
  res.status(201).json({ mensagem: 'Usuário criado', usuario: novoUsuario });
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  usuarios[index] = { ...usuarios[index], ...req.body };
  res.json({ mensagem: 'Usuário atualizado', usuario: usuarios[index] });
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  usuarios.splice(index, 1);
  res.status(204).send();
});

app.post('/upload', upload.single('arquivo'), (req, res) => {
  res.json({ mensagem: 'Arquivo enviado com sucesso', arquivo: req.file });
});

const fs = require('fs');
app.get('/files', (req, res) => {
  fs.readdir('uploads', (err, arquivos) => {
    if (err) return res.status(500).json({ erro: 'Erro ao listar arquivos' });
    res.json({ arquivos });
  });
});

app.get('/docs', (req, res) => {
  res.json({
    rotas: {
      '/auth/register': 'Registrar novo usuário',
      '/auth/login': 'Login do usuário',
      '/users': 'Gerenciar usuários (protegido)',
      '/upload': 'Upload de arquivos',
      '/files': 'Listar arquivos enviados',
      '/docs': 'Documentação da API'
    },
    token_de_exemplo: 'seu-token-secreto'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Algo deu errado!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Projeto rodando em http://localhost:${PORT}`);
});