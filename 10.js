const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

let produtos = [
	{ id: 1, nome: 'Caneca Node', preco: 29.9, categoria: 'Cozinha' },
	{ id: 2, nome: 'Camiseta JS', preco: 49.9, categoria: 'Vestuário' }
];

// GET - Listar todos os produtos
app.get('/produtos', (req, res) => {
	res.json(produtos);
});

// GET - Buscar produto por ID
app.get('/produtos/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const produto = produtos.find(p => p.id === id);
    
	if (produto) {
		res.json(produto);
	} else {
		res.status(404).json({ erro: 'Produto não encontrado' });
	}
});

// POST - Criar novo produto
app.post('/produtos', (req, res) => {
	const { nome, preco, categoria } = req.body;
    
	// Validação básica
	if (!nome || preco == null || !categoria) {
		return res.status(400).json({ erro: 'Dados incompletos' });
	}
    
	const novoProduto = {
		id: produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
		nome,
		preco,
		categoria
	};
    
	produtos.push(novoProduto);
	res.status(201).json(novoProduto);
});

// PUT - Atualizar produto
app.put('/produtos/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const index = produtos.findIndex(p => p.id === id);
    
	if (index === -1) {
		return res.status(404).json({ erro: 'Produto não encontrado' });
	}
    
	// Atualize o produto (preserva id)
	produtos[index] = { ...produtos[index], ...req.body, id: produtos[index].id };
	res.json(produtos[index]);
});

// DELETE - Remover produto
app.delete('/produtos/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const index = produtos.findIndex(p => p.id === id);
    
	if (index === -1) {
		return res.status(404).json({ erro: 'Produto não encontrado' });
	}
    
	produtos.splice(index, 1);
	res.status(204).send();
});

app.listen(PORT, () => {
	console.log(`API rodando em http://localhost:${PORT}`);
});